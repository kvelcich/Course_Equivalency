use sdb_kvelcich;

CREATE TABLE course (
    school    				VARCHAR(50),
    department    			VARCHAR(50),
    course_number   		VARCHAR(10),
    PRIMARY KEY (school, department, course_number)
);

CREATE TABLE equivalent (
	internal_school			VARCHAR(50),
	internal_department		VARCHAR(50),
	internal_course_number	VARCHAR(10),
	external_school			VARCHAR(50),
	external_department		VARCHAR(50),
	external_course_number	VARCHAR(10),
    is_equivalent    		INT(1),

    FOREIGN KEY (internal_school, internal_department, internal_course_number)
	REFERENCES course(school, department, course_number),

	FOREIGN KEY (external_school, external_department, external_course_number)
	REFERENCES course(school, department, course_number),

	CHECK (internal_school = 'Santa Clara University'),
    CHECK (is_equivalent = 1 OR is_equivalent = 0)
);

CREATE TABLE advisor (
    email           VARCHAR(25) NOT NULL,
    first		 	VARCHAR(50),
    last	        VARCHAR(50),
    password        VARCHAR(50),

    PRIMARY KEY (email)
);
