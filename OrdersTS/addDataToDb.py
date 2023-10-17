import sqlite3

# Connect to database 
conn = sqlite3.connect('Orders.db')

# Set text encoding
conn.text_factory = str
conn.execute('PRAGMA encoding="utf-8"') 

# Create table
conn.execute("Drop TABLE IF EXISTS Clients")
conn.execute("Drop TABLE IF EXISTS Content")
conn.execute("Drop TABLE IF EXISTS Items")
conn.execute("""CREATE TABLE IF NOT EXISTS Clients (id integer primary key, EnName text, ArName text)""")
conn.execute("""CREATE TABLE IF NOT EXISTS Content (id integer primary key, code int, EnName text, ArName text)""")
conn.execute("""CREATE TABLE IF NOT EXISTS Items (id integer primary key, EnName text, ArName text, Price real)""")


# Data text 
class Names :
    def __init__(self, EnName, ArName) -> None:
        self.EnName = EnName
        self.ArName = ArName

class Content :
    def __init__(self, Code, EnName, ArName) -> None:
        self.Code = Code
        self.EnName = EnName
        self.ArName = ArName

class Items :
    def __init__(self, EnName, ArName, Price) -> None:
        self.EnName = EnName
        self.ArName = ArName
        self.Price = Price

content = []
content.append(Content( 1 , 'Add New Order', 'أضف طلب جديد'));
content.append(Content( 2 , 'Name', 'الاسم'));
content.append(Content( 3 , 'Order', 'الطلب'));
content.append(Content( 4 , 'Add', 'أضف'));
content.append(Content( 5 , 'Remove', 'حذف'));
content.append(Content( 6 , 'Cancel', 'الغاء'));
content.append(Content( 7 , 'Total Order', 'الطلب الكلى'));
content.append(Content( 8 , 'EP', 'ج'));
content.append(Content( 9 , 'ع', 'E'));
content.append(Content( 10 , 'Client Total', 'اجمالى العميل'));
content.append(Content( 11 , 'En Name', 'الاسم بالانجليزية'));
content.append(Content( 12 , 'Ar Name', 'الاسم بالعربية'));
content.append(Content( 13 , 'Price', 'السعر'));
content.append(Content( 14 , 'Add New Type', 'اضافة صنف جديد'));
content.append(Content( 15 , 'Add New Name', 'اضافة اسم جديد'));
content.append(Content( 16 , 'Submit', 'إرسال'));
content.append(Content( 17 , 'Names', 'الأسماء'));
content.append(Content( 18 , 'Types', 'الأصناف'));

clients = []
clients.append(Names('Mohammed Ashraf', 'محمد أشرف'));
clients.append(Names('Islam Ibrahim', 'اسلام ابراهيم'));
clients.append(Names('Ahmed Elsiad', 'أحمد السعيد'));
clients.append(Names('Moahmmed Tarek', 'محمد طارق'));
clients.append(Names('Ahmen Qabail', 'أحمد قابيل'));

types = []
types.append(Items('Fool', 'فول', 7));
types.append(Items('Ta3mia', 'طعمية', 7));
types.append(Items('Potatoes', 'بطاطس', 9));
types.append(Items('Chease', 'جبنة', 8));
types.append(Items('Egg', 'بيض', 7.5));
types.append(Items('Papa', 'بابا', 8));

# Insert text
for obj in content:
    conn.execute("INSERT INTO Content(EnName, ArName) VALUES ( ?, ?)", (obj.EnName, obj.ArName,))

for obj in clients:
    conn.execute("INSERT INTO Clients(EnName, ArName) VALUES ( ?, ?)", (obj.EnName, obj.ArName,))

for obj in types:
    conn.execute("INSERT INTO Items(EnName, ArName, Price) VALUES ( ?, ?, ?)", (obj.EnName, obj.ArName, obj.Price,))


# Commit changes
conn.commit()

# Print inserted text
print(conn.execute("SELECT * FROM Clients").fetchone())

# Close connection
conn.close()