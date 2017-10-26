CREATE TABLE Course(
    CourseID        INT NOT NULL AUTO INCREMENT,
    School          VARCHAR(50),
    Department      VARCHAR(50),
    CourseNumber    VARCHAR(10),
    PRIMARY KEY CourseID
);

CREATE TABLE Equivalent(
    InternalID      INT NOT NULL,
    ExternalID      INT NOT NULL,
    IsEquivalent    INT(1),

    FOREIGN KEY InternalID REFERENCES Course(CourseID),
    FOREIGN KEY ExternalID REFERENCES Course(CourseID),

    CHECK (InternalID != ExternalID),
    CHECK (IsEquivalent = 1 OR IsEquivalent = 0)
);

CREATE TABLE Advisor(
    Email           VARCHAR(25) NOT NULL,
    FirstName       VARCHAR(50),
    LastName        VARCHAR(50),
    Password        VARCHAR(50),

    PRIMARY KEY Email
);
