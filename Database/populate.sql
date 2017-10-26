use sdb_kvelcich;

INSERT INTO course (school, department, course_number)
    VALUES ('San Jose State Univeristy', 'CSE', '101'),
    ('San Jose State Univeristy', 'CSE', '102'),
    ('San Jose State Univeristy', 'CSE', '103'),
    ('San Jose State Univeristy', 'CSE', '104'),
    ('Stanford Univeristy', 'CS', '101'),
    ('Stanford Univeristy', 'CS', '102'),
    ('Stanford Univeristy', 'CS', '103'),
    ('Stanford Univeristy', 'CS', '104'),
    ('Univeristy of California, Santa Cruz', 'CSE', '201'),
    ('Univeristy of California, Santa Cruz', 'CSE', '202'),
    ('Univeristy of California, Santa Cruz', 'CSE', '203'),
    ('Univeristy of California, Santa Cruz', 'CSE', '204'),
    ('Santa Clara University', 'COEN', '201'),
    ('Santa Clara University', 'COEN', '202'),
    ('Santa Clara University', 'COEN', '203'),
    ('Santa Clara University', 'COEN', '204');

INSERT INTO equivalent (internal_id, external_id, is_equivalent)
SELECT (SELECT C.course_id from course C where C.school = 'Santa Clara University' AND C.department = 'COEN' AND C.course_number = '201'),
(SELECT C.course_id from course C where C.school = 'San Jose State Univeristy' AND C.department = 'CSE' AND C.course_number = '102'),
1;

INSERT INTO equivalent (internal_id, external_id, is_equivalent)
SELECT (SELECT C.course_id from course C where C.school = 'Santa Clara University' AND C.department = 'COEN' AND C.course_number = '202'),
(SELECT C.course_id from course C where C.school = 'Univeristy of California, Santa Cruz' AND C.department = 'CSE' AND C.course_number = '202'),
1;

INSERT INTO equivalent (internal_id, external_id, is_equivalent)
SELECT (SELECT C.course_id from course C where C.school = 'Santa Clara University' AND C.department = 'COEN' AND C.course_number = '202'),
(SELECT C.course_id from course C where C.school = 'Stanford Univeristy' AND C.department = 'CS' AND C.course_number = '104'),
1;

INSERT INTO equivalent (internal_id, external_id, is_equivalent)
SELECT (SELECT C.course_id from course C where C.school = 'Santa Clara University' AND C.department = 'COEN' AND C.course_number = '204'),
(SELECT C.course_id from course C where C.school = 'San Jose State Univeristy' AND C.department = 'CSE' AND C.course_number = '101'),
0;
