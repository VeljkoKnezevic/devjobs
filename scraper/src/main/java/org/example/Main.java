package org.example;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebResponse;
import com.gargoylesoftware.htmlunit.html.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        try (WebClient webClient = new WebClient()) {
            // Configure WebClient to ignore JavaScript and CSS
            webClient.getOptions().setJavaScriptEnabled(false);
            webClient.getOptions().setCssEnabled(false);

            // Load the main page
            HtmlPage page = webClient.getPage("https://wellfound.com/role/r/software-engineer");

            // Find all job listing divs
            List<HtmlElement> divs = page.getByXPath("//div[contains(@class, 'mb-6 w-full rounded border border-gray-400 bg-white')]");
            List<JobListing> jobListings = new ArrayList<>();

            for (HtmlElement element : divs) {
                JobListing jobListing = new JobListing(
                        // Company
                        extractTextFromXPath(element, ".//h2"),
                        // Logo
                        extractLogoSrc(element),
                        // Posted at
                        extractTextFromXPath(element, ".//span[contains(@class, 'text-xs lowercase text-dark-a mr-2 hidden flex-wrap content-center md:flex')]"),
                        // Location
                        extractLocation(element),
                        // Contract
                        extractTextFromXPath(element, ".//span[contains(@class, 'whitespace-nowrap rounded-lg bg-accent-yellow-100 px-2 py-1 text-[10px] font-semibold text-neutral-800')]"),
                        // Website, apply and subscription
                        extractJobDetails(page)

                );
                jobListings.add(jobListing);
                break;
            }

            printJobListings(jobListings);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Helper functions
    private static String extractTextFromXPath(HtmlElement element, String xpath) {
        HtmlElement foundElement = element.getFirstByXPath(xpath);
        return foundElement != null ? foundElement.asNormalizedText() : "N/A";
    }

    private static String extractLogoSrc(HtmlElement element) {
        HtmlImage logo = element.getFirstByXPath(".//img");
        if (logo != null && logo.getSrcAttribute() != null) {
            String[] parts = logo.getSrcAttribute().split("auto");
            return parts.length > 1 ? parts[1].substring(1) : "No logo";
        }
        return "No logo";
    }

    private static String extractLocation(HtmlElement element) {
        List<HtmlElement> locations = element.getByXPath(".//span[contains(@class, 'pl-1 text-xs')]");
        return locations.size() > 1 ? locations.get(1).asNormalizedText() : "No location listed";
    }

    private static List<JobDetails> extractJobDetails(HtmlPage page) {
        List<JobDetails> jobDetails = new ArrayList<>();
        List<HtmlAnchor> positions = page.getByXPath("//a[contains(@class, 'mr-2 text-sm font-semibold text-brand-burgandy hover:underline')]");

        for (HtmlAnchor position : positions) {
            try {
                HtmlPage insidePage = position.click();

                HtmlElement description = (HtmlElement) insidePage.getElementById("job-description");
                URL apply =  insidePage.getUrl();


                if (description != null && apply != null) {
                    jobDetails.add(new JobDetails(
                            apply.toString(),
                            description.asXml()
                    ));
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return jobDetails;
    }

    private static void printJobListings(List<JobListing> jobListings) {
        for (JobListing listing : jobListings) {
            System.out.println("Company: " + listing.company());
            System.out.println("Logo: " + listing.logo());
            System.out.println("Posted At: " + listing.postedAt());
            System.out.println("Location: " + listing.location());
            System.out.println("Contract: " + listing.contract());

            for (JobDetails details : listing.jobDetails()) {
                System.out.println("Apply Link: " + details.getApplyLink());
                System.out.println("Description: " + details.getDescription());

            }
            System.out.println("---------------------------------------");
        }
    }

}