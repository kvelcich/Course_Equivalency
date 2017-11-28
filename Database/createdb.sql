CREATE TABLE course (
    course_id       INT NOT NULL AUTO_INCREMENT,
    school    		  VARCHAR(500),
    department    	VARCHAR(50),
    course_number   VARCHAR(10),
    PRIMARY KEY (course_id)
);

CREATE TABLE adviser (
    email           VARCHAR(100) NOT NULL,
    password        VARCHAR(100),

    PRIMARY KEY (email)
);

CREATE TABLE equivalent (
    internal_id       INT NOT NULL,
    external_id       INT NOT NULL,
    is_equivalent     INT(1),
    evaluator         VARCHAR(100) NOT NUll,
    reason            TEXT,

    PRIMARY KEY (internal_id, external_id),
    FOREIGN KEY (internal_id) REFERENCES course (course_id),
    FOREIGN KEY (external_id) REFERENCES course (course_id),
    FOREIGN KEY (evaluator) REFERENCES adviser (email),

    CHECK (internal_id != external_id),
    CHECK (is_equivalent = 1 OR is_equivalent = 0)
);
