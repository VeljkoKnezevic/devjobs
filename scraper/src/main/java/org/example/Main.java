package org.example;


import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlAnchor;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlImage;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import io.github.cdimascio.dotenv.Dotenv;

import java.io.IOException;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Main {

    private static final Dotenv dotenv = Dotenv.load();
    private static final String DB_URL = dotenv.get("DB_URL");
    private static final String DB_USER = dotenv.get("DB_USERNAME");
    private static final String DB_PASSWORD = dotenv.get("DB_PASSWORD");

    public static void main(String[] args) {
        try (WebClient webClient = new WebClient()) {
            webClient.getOptions().setJavaScriptEnabled(false);
            webClient.getOptions().setCssEnabled(false);

            HtmlPage page = webClient.getPage("https://wellfound.com/role/r/software-engineer");

            List<HtmlElement> divs = page.getByXPath("//div[contains(@class, 'mb-6 w-full rounded border border-gray-400 bg-white')]");
            List<JobListing> jobListings = new ArrayList<>();

            List<JobDetails> jobDetails = extractJobDetails(page);

            for (HtmlElement element : divs) {
                JobListing jobListing = new JobListing(
                        // Company
                        extractTextFromXPath(element, ".//h2"),
                        // Logo
                        extractLogoSrc(element),
                        // Position
                        extractTextFromXPath(element, "//a[contains(@class, 'mr-2 text-sm font-semibold text-brand-burgandy hover:underline')]"),
                        // Posted at
                        extractTextFromXPath(element, ".//span[contains(@class, 'text-xs lowercase text-dark-a mr-2 hidden flex-wrap content-center md:flex')]"),
                        // Location
                        extractLocation(element),
                        // Contract
                        extractTextFromXPath(element, ".//span[contains(@class, 'whitespace-nowrap rounded-lg bg-accent-yellow-100 px-2 py-1 text-[10px] font-semibold text-neutral-800')]"),
                        // Apply and description
                        jobDetails.get(element.getIndex())
                );
                jobListings.add(jobListing);
            }

            printJobListings(jobListings);
            saveJobListingsToDatabase(jobListings);

        } catch (IOException e) {
            e.printStackTrace();

        } catch (SQLException e) {
            throw new RuntimeException(e);
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
        HtmlElement location = element.getFirstByXPath(".//span[contains(text(), 'Remote')]");
        return location != null ? location.asNormalizedText() : "No location listed";
    }

    private static List<JobDetails> extractJobDetails(HtmlPage page) throws IOException {
        List<JobDetails> jobDetails = new ArrayList<>();
        List<HtmlAnchor> positions = page.getByXPath("//a[contains(@class, 'mr-2 text-sm font-semibold text-brand-burgandy hover:underline')]");


        for(HtmlAnchor position: positions) {
            HtmlPage insidePage = position.click();

            HtmlElement description = (HtmlElement) insidePage.getElementById("job-description");
            URL apply = insidePage.getUrl();


            if (description != null && apply != null) {
                jobDetails.add(new JobDetails(
                        apply.toString(),
                        description.asXml()
                ));
            }
        }


        return jobDetails;
    }

    private static void printJobListings(List<JobListing> jobListings) {
        for (JobListing listing : jobListings) {
            System.out.println("Company: " + listing.company());
            System.out.println("Logo: " + listing.logo());
            System.out.println("Position: " + listing.position());
            System.out.println("Posted At: " + listing.postedAt());
            System.out.println("Location: " + listing.location());
            System.out.println("Contract: " + listing.contract());
            System.out.println("Apply Link: " + listing.jobDetails().getApplyLink());
            System.out.println("Description: " + listing.jobDetails().getDescription());

            System.out.println("---------------------------------------");
        }

    }

    private static void saveJobListingsToDatabase(List<JobListing> jobListings) throws SQLException {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String createTableSQL = """
                CREATE TABLE IF NOT EXISTS job_listing (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    company VARCHAR(255),
                    logo VARCHAR(500),
                    position VARCHAR(100),
                    posted_at VARCHAR(100),
                    location VARCHAR(255),
                    contract VARCHAR(100),
                    apply_link VARCHAR(500),
                    description TEXT
                )
            """;
            connection.createStatement().execute(createTableSQL);

            String insertSQL = """
                INSERT INTO job_listing 
                (company, logo, position,  posted_at, location, contract, apply_link, description) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """;

            try (PreparedStatement pstmt = connection.prepareStatement(insertSQL)) {
                for (JobListing listing : jobListings) {
                    pstmt.setString(1, listing.company());
                    pstmt.setString(2, listing.logo());
                    pstmt.setString(3, listing.position());
                    pstmt.setString(4, listing.postedAt());
                    pstmt.setString(5, listing.location());
                    pstmt.setString(6, listing.contract());
                    pstmt.setString(7, listing.jobDetails().getApplyLink());
                    pstmt.setString(8, listing.jobDetails().getDescription());

                    pstmt.executeUpdate();
                }
            }

            System.out.println("Successfully saved " + jobListings.size() + " job listings to database.");
        }
    }


}