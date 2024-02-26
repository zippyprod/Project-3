--DROP TABLE airbnb_ny;

CREATE TABLE airbnb_ny (
	id  BIGINT,
	name VARCHAR(50),
	num_bedrooms INT,
	bedroom_type VARCHAR(20),
	num_of_beds INT,
	num_of_bathrooms NUMERIC,
	bathroom_type VARCHAR(25),
	host_name VARCHAR(50),
	borough VARCHAR(25),
	neighborhood VARCHAR (50),
	latitude NUMERIC,
	longitude NUMERIC,
	room_type VARCHAR (25),
	price INT,
	minimum_nights INT,
	number_of_reviews INT,
	last_review DATE,
	reviews_per_month NUMERIC, 
	calculated_host_listings_count INT,
	availability_365 INT,
	number_of_reviews_ltm INT,
	license VARCHAR(30),
	PRIMARY KEY (ID)
	);



	
	
	
	






