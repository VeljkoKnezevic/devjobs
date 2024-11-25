package org.example;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlAnchor;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class Main {

    public static void main(String[] args) throws IOException {

        String searchUrl = "https://wellfound.com/role/r/software-engineer";

        try (WebClient webClient = new WebClient()) {
            webClient.getOptions().setCssEnabled(false);
            webClient.getOptions().setJavaScriptEnabled(false);

            // Load the webpage
            HtmlPage page = webClient.getPage(searchUrl);

            // Get all divs with class "searchDisplay-div"
            List<HtmlElement> divs = page.getByXPath("//div[contains(@class, 'mb-6 w-full rounded border border-gray-400 bg-white')]");

            // Loop through each div and get the h5 tags
            for (HtmlElement element : divs) {
                HtmlElement company = element.getFirstByXPath(".//h2");
                HtmlElement timePosted = element.getFirstByXPath(".//span[contains(@class, 'text-xs lowercase text-dark-a mr-2 hidden flex-wrap content-center md:flex')]");
                HtmlElement position = element.getFirstByXPath(".//a[contains(@class, 'mr-2 text-sm font-semibold text-brand-burgandy hover:underline')]");
                HtmlElement type = element.getFirstByXPath(".//span[contains(@class, 'whitespace-nowrap rounded-lg bg-accent-yellow-100 px-2 py-1 text-[10px] font-semibold text-neutral-800')]");
                List<HtmlElement> location = element.getByXPath(".//span[contains(@class, 'pl-1 text-xs')]");

                if (company != null) {
                    System.out.println("Company: " + company.asNormalizedText());
                    System.out.println("Time posted: " + timePosted.asNormalizedText());
                    System.out.println("Position: " + position.asNormalizedText());
                    System.out.println("Location:" + ((location.size() > 1) ? location.get(1).asNormalizedText() : " No location listed"));
                    System.out.println("Type: " + type.asNormalizedText());
                    System.out.println("---------------------------------------");
                }
            }
        }

    }
}