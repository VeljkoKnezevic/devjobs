package com.veljkoknezevic.server.service;

import com.veljkoknezevic.server.model.JobListing;
import com.veljkoknezevic.server.repository.JobListingRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class JobListingService {

    private final JobListingRepository jobListingRepository;

    public JobListingService(JobListingRepository jobListingRepository) {
        this.jobListingRepository = jobListingRepository;
    }

    public List<JobListing> findAllJobListings() {
        Iterable<JobListing> jobListingsIterable = jobListingRepository.findAll();

        List<JobListing> jobListings = new ArrayList<>();

        jobListingsIterable.forEach(jobListings::add);

        return jobListings;

    }
}
