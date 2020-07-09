set schema 'ers';

insert into roles ("role")
	values ('admin'),('finance-manager'), ('user');

select * from roles r; 

insert into users("username","password","first_name", "last_name", "email", "role")
	values	('patches','password','Richard','Hendricks','patches@piedpiper.com','1'),
			('koolaid','password','Erlich','Bachman','koolaid@aviato.net','3'),
			('bighead','password','Nelson','Bighetti','bighead@hooli.com','3'),
			('cheifsystemsarchitect','password','Bertram','Gilfoyle','cheifsystemsarchitect@piedpiper.com','3'),
			('tesla','password','Dinesh','Chugtai','tesla@piedpiper.com','1'),
			('mhall','password','Monica','Hall','mhall@raviga.com','2'),
			('jared','password','Donald','Dunn','Jared@piedpiper.com','1'),
			('triplecoma','password','Russ','Hannenman','triplecoma@radioontheinternet.net','2'),
			('lbream','password','Laurie','Bream','lbream@raviga.com','2'),
			('pgregory','password','Peter','Gregory','formerly@raviga.com','2');
			
select * from users u;
