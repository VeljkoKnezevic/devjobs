package com.veljkoknezevic.server.controller;

import com.veljkoknezevic.server.model.JobListing;
import com.veljkoknezevic.server.service.JobListingService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class JobListingController {

    private final JobListingService jobListingService;

    public JobListingController(JobListingService jobListingService) {
        this.jobListingService = jobListingService;
    }

    @GetMapping("/")
    public ResponseEntity<List<JobListing>> findAllJobListings() {
        List<JobListing> jobListings = jobListingService.findAllJobListings();

        return ResponseEntity.ok(jobListings);
    }

}
