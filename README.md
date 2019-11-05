# Interview Test
A basic test for candidates interested in _Server Side_ development.

## INSTRUCTIONS

 * **Collections** are containers, **Products** belong to.
 * **Products** have **Collections** associated with them.
 * Example of a **Collection** object:
	```javascript
	{
		id: "0B5F2B26-56BC-43EB-8A3C-3FF607FD079A",
    		collectionName: "Women Destination Winter 19 Tees"
	}
	```
 * Example of a **Product** object:
 	```javascript
	{
		productName: "Pastel Blue Boxes",
		productCollections: "{\"F61F0DF7-69E8-4D2A-B377-32BB6D93132A\":{\"name\":\"Custom Shirts\",\"id\":\"F61F0DF7-69E8-4D2A-B377-32BB6D93132A\",\"url\":\"custom-shirts\",\"image\":\"\",\"priority\":2}}"
	}
	```
 * You need to write _RESTful APIs_ for both **Products** and **Collections**.
 * You need to write an API that updates **Collections** with _Product IDs_
   of the **Products** that are associated with them.
 * There's a theoretical/conceptual question in `/question.txt`,
   you'll need to answer that as well.

 * You can find the data for both **Collections** and **Products** in `/data` folder.
 * The _folder structure_ should be chosen with future development in mind.
    * If you feel there's a certain reason for the _folder structure_ you've
	 chosen to go with, mention it in a seperate file as well.
	 (not important though)
 * Use _Express_ to setup the server.
 * There will be a million ways to do this, so the way you choose to do it
   will be looked at carefully.

 ## WHAT WE ARE LOOKING FOR
 * The _approach_ you take to solve the problems.
 * The way you _code_.
 * _Git_ usage.
