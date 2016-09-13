CREATE TABLE Users(
		id int NOT NULL PRIMARY KEY,
		login nvarchar(50) NOT NULL,
		password nvarchar(50) NOT NULL
)

CREATE TABLE Cupboards(
	id int NOT NULL PRIMARY KEY,
	code nvarchar(200) NOT NULL,
	idUser int NULL FOREIGN KEY REFERENCES Users(id)
)