package org.example;

import java.util.List;

public record JobListing(String company, String logo, String postedAt, String location, String contract, JobDetails jobDetails) {
}
