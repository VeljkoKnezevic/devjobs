package com.veljkoknezevic.server.repository;

import com.veljkoknezevic.server.model.JobListing;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


public interface JobListingRepository extends CrudRepository<JobListing, Integer> {
}
