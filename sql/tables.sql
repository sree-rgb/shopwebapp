CREATE TABLE customerlist (
	id SERIAL PRIMARY KEY,
	mobile_number NUMERIC,
	customer_name VARCHAR NOT NULL
);


CREATE TABLE billlist (
	id SERIAL PRIMARY KEY,
	date1 VARCHAR NOT NULL,
	customer_id INTEGER REFERENCES customerlist,
);
INSERT INTO billList (date1,customer_name,total)
 VALUES ('1609845706.791238','No_name',415);

 
 CREATE TABLE saleslist(
salesid SERIAL PRIMARY KEY,
itemname VARCHAR NOT NULL,
rate NUMERIC(6,2) NOT NULL,
quantity NUMERIC(6,2) NOT NULL,
billid INTEGER REFERENCES billList
 	);