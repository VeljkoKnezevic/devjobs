package org.example;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlAnchor;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlImage;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

import java.io.IOException;
import java.math.BigDecimal;
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
                        extractJobDetails(element)
                );

                jobListings.add(jobListing);
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

                HtmlElement websiteButton = insidePage.getFirstByXPath(".//button[contains(@class, 'styles_websiteLink___Rnfc')]");
                HtmlElement applyButton = insidePage.getFirstByXPath("//div[contains(@class, 'styles_component__4MnBs')]//button");
                HtmlElement description = insidePage.getFirstByXPath("//div[contains(@class, 'styles_description__36q7q')]");

                if (websiteButton != null && applyButton != null) {
                    jobDetails.add(new JobDetails(
                            websiteButton.asNormalizedText(),
                            applyButton.asNormalizedText(),
                            description.asNormalizedText()
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
                System.out.println("Website: " + details.getWebsite());
                System.out.println("Apply Link: " + details.getApplyLink());
                System.out.println("Description: " + details.getDescription());

            }
            System.out.println("---------------------------------------");
        }
    }

    private static JobDetails extractJobDetails(HtmlAnchor position) {
        try {
            HtmlPage insidePage = position.click();
            JobDetails details = new JobDetails();

            HtmlElement websiteButton = insidePage.getFirstByXPath(".//button[contains(@class, 'styles_websiteLink___Rnfc')]");
            HtmlElement applyButton = insidePage.getFirstByXPath("//div[contains(@class, 'styles_component__4MnBs')]//button");
            HtmlElement description = insidePage.getFirstByXPath("//div[contains(@class, 'styles_description__36q7q')]");

            if (websiteButton != null && applyButton != null) {
                details.setWebsite(websiteButton.asNormalizedText());
                details.setApplyLink(applyButton.asNormalizedText());
                details.setDescription(description.asNormalizedText());

                return details;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}