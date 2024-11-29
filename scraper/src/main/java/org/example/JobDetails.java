package org.example;

import com.gargoylesoftware.htmlunit.html.Html;
import com.gargoylesoftware.htmlunit.html.HtmlAnchor;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

public class JobDetails {
    private String applyLink;
    private String description;

    public JobDetails() {

    }

    public JobDetails(String applyLink, String description) {
        this.applyLink = applyLink;
        this.description = description;
    }


    public String getApplyLink() {
        return applyLink;
    }

    public void setApplyLink(String applyLink) {
        this.applyLink = applyLink;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
