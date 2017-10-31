  use sdb_kvelcich;

CREATE TABLE course (
    course_id       INT NOT NULL AUTO_INCREMENT,
    school    		VARCHAR(50),
    department    	VARCHAR(50),
    course_number   VARCHAR(10),
    PRIMARY KEY (course_id)
);

CREATE TABLE equivalent (
    internal_id      INT NOT NULL,
    external_id      INT NOT NULL,
    is_equivalent    INT(1),

	PRIMARY KEY (internal_id, external_id),
    FOREIGN KEY (internal_id) REFERENCES course(course_id),
    FOREIGN KEY (external_id) REFERENCES course(course_id),

    CHECK (internal_id != external_id),
    CHECK (is_equivalent = 1 OR is_equivalent = 0)
);

CREATE TABLE advisor (
    email           VARCHAR(25) NOT NULL,
    password        VARCHAR(50),

    PRIMARY KEY (email)
);
