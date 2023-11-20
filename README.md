
# Sports Assist

Sports Assist is a multi-functional web application designed to provide a wide range of communication and management tools to sports teams.

A user takes on the role of either a manager or a player. A manager acts as a team's administrator; they can upload training, fitness, fixture, formation, and tactical content to the team's dashboard. A player can review this content, add comments, make forum posts, and communicate with their team members and manager.

Sports Assist provides the facility for managers to manage multiple teams and for players to join multiple teams.

## Technologies Used

- **Express:** Express is used to build the application's server-side. It provides a framework for creating and handling HTTP requests and routes.

- **Node:** Node is used as the runtime environment for the application. It allows server-side JavaScript execution and facilitates the handling of asynchronous operations.

- **Handlebars:** Handlebars is used to create reusable webpage templates on the application's client-side.

- **MongoDB:** MongoDB is used as the primary database for the application. It stores all of the application's data.

- **Passport:** Passport is used to implement user authentication in the application. It allows users to sign up, sign in, and securely access the application's features and data.

## Prerequisites

### Software Installations

Before running the application, the following software must be installed:

- [Node](https://nodejs.org/)

### Environment Variables

Before running the application, the following environment variables must be set, these variables should be stored in a `.env` file at the project root:

| **Environment Variable** | **Description** |
|-----------------------------------|-----------------------------------------------------|
| **APP_PORT** | The port on which the application should listen. |
| **MAIL_HOST** | The server that mail is hosted on. |
| **MAIL_PASSWORD** | The password for the mail account. |
| **MAIL_USER** | The email address for the mail account. |
| **MONGODB_URI** | The connection string for MongoDB. |
| **SESSION_KEY** | The key used to create the session. |
| **SESSION_SECRET** | The secret used to create the session. |
| **WHITELISTED_CORS_URLS** | A list of URLs allowed for Cross-Origin requests. |

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/fiachrahealy/Sports_Assist.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Sports_Assist
    ```

3. Install the dependencies for both the server and client:

    ```bash
    npm install
    ```

4. Create the `.env` file (see the prerequisites section above for file contents):

    ```bash
    cat > .env
    ```

5. Start the application:

    ```bash
    npm start
    ```

6. Access the application:

    Access the application in a web browser or API platform at http://localhost:[APP_PORT].

## Features

### Registration and Authentication

When a user navigates to the application for the first time, they are prompted to either sign in to an existing account or create a new account.

When creating an account, a user provides their name, their email address, their date of birth, and a password. The user is prompted to create an avatar using the interactive avatar creation tool (selecting a hair colour, hair style, and skin tone). Importantly, it’s here that the user chooses to assume either the role of a manager or player. After successfully signing up, a manager will be immediately redirected to the team creation tool, where they’ll create their first team, provide a team name and address, and create a jersey using the interactive jersey creation tool (selecting two colours and a jersey style). After a player signs up, they are redirected to the join a team page. The player will need the 5-character unique team join code to join a team; they can retrieve this from the team’s manager.

When a user signs in, authentication is carried out server-side by Passport. Passport retrieves the inputted password and compares it to the salted and hashed password securely stored in the database. If the sign-in is successful, the user is redirected to the team’s page, and a session cookie is assigned to the user’s browser. If the sign-in is unsuccessful, an error message is displayed to the user.

### Manager Features

After creating their first team, a manager is redirected to the teams page. Here is where a manager can navigate between multiple different teams. On the sidebar to the left, a manager has the option of opening the team creation tool to create additional teams. In the centre of the page, a manager’s managed teams are displayed, each represented by their unique jersey. A total of six jerseys can be displayed at once; should the manager create seven or more teams, the jersey list becomes a carousel, transitioning between the required number of jersey slides.

When a manager selects a team, they are redirected to that team’s dashboard and assigned a unique team cookie. This ensures that data retrieved anywhere in the application from this point onward is specific to this team only. The team’s dashboard provides access to twelve areas that each provide functionality that the manager can use to assist in managing their team.

These twelve areas are:

- **Nutrition:** A manager can log nutritional data here for the team.
- **Training:** A manager can upload training information here; the training can be individual or team-oriented.
- **Video Analysis:** A manager can upload relevant YouTube videos for the team here. The manager provides the URL to the video, and the video upload tool embeds the video on the page.
- **Gym:** A manager can log exercises for the team here. These exercises can be grouped into workouts and list the recommended number of sets or reps
- **Results:** A manager can upload the results of matches played by the team here. The score, location, and other information are listed here.
- **Fixtures:** A manager can provide details relating to future team fixtures here. Similar to the results, the location, referee, and other fixture information are listed here.
- **Noticeboard:** A manager can write private messages to team players here. A manager has access to every player’s noticeboard; here they can pin sticky notes with information they wish to share with the player privately.
- **Formations:** A manager can create custom formations and game plans here. The custom formation creation tool allows a manager to add and remove markers to and from the field, indicating a specific formation to be followed by the team.
- **Forum:** A manager can access, create, edit and delete posts on the team-specific forum here. All forum posts are public to the entire team, and the area can be used as a team-wide discussion page.
- **Squad:** A manager can view and edit the team’s roster here. A manager has the ability to modify player statistics; these could be, for example, the number of goals or the number of red cards.
- **Team Email:** A manager can send a team-wide email to all of the player's on-file email addresses here.
- **Team Settings:** A manager can edit the team’s information here. Modifications can be made to the team name, location, and the jersey.

### Player Features:

After joining their first team, a player is redirected to the teams page. Here is where a player can navigate between multiple different teams. On the sidebar to the left, a player has the option of joining additional teams. In the centre of the page, a player’s teams are displayed, each represented by their unique jersey. A total of six jerseys can be displayed at once; should the player join seven or more teams, the jersey list becomes a carousel, transitioning between the required number of jersey slides.

When a player selects a team, they are redirected to that team’s dashboard and assigned a unique team cookie. This ensures that data retrieved anywhere in the application from this point onward is specific to this team only. The team’s dashboard provides access to eleven areas that each provide a unique functionality to the player.

These areas are:
- **Nutrition:** A player can log and calculate relevant nutritional data here. This data is private to the player.
- **Training:** A player can review uploaded training information here; the training can be individual or team-oriented.
- **Video Analysis:** A player can watch the relevant YouTube videos uploaded by the manager for the team here.
- **Gym:** A player can review exercises uploaded by the manager for the team here. These exercises are grouped into workouts, and the recommended number of sets or reps is listed.
- **Results:** A player can check the results of matches uploaded by the manager here. The score, location and other information are listed here.
- **Fixtures:** A player can review details relating to future team fixtures uploaded by the manager here. Similar to the results, the location, referee, and other fixture information are listed here.
- **Noticeboard:** A player can read private messages written by the manager here. A player can only access and read sticky notes on their own noticeboard.
- **Formations:** A player can review team-specific custom formations and game plans uploaded by the manager here.
- **Forum:** A player can access, create, delete and edit posts on the team-specific forum here. All forum posts are public to the entire team, and the area can be used as a team-wide discussion page.
- **Squad:** A player can view the team’s roster here. A player can review but not modify player statistics here; these could be, for example, the number of goals or the number of red cards.
- **Team Details:** A player can view the team's details (name, location etc) here.

### All User Features:
Two features can be accessed by all signed-in users, regardless of whether they are managers or players. These are the account settings and application-wide public discussion forum. Both of these features can be accessed from the application’s navigation bar.

- **Account settings:** A user can modify their account details here. A user can update their name, email address, date of birth, and avatar in this area.
- **Public forum:** A user can access the application-wide public discussion forum here. This forum is similar to the team-specific forum; users can upload, delete, and edit posts, but all posts are public to every signed-in user of the application. It can be used as an application-wide discussion area.

## Authors

- [Fiachra Healy](https://www.linkedin.com/in/fiachrahealy/)
- [Joseph Ribbon](https://www.linkedin.com/in/seosamhoroibin/)
- [Aleksander Kośnik](https://www.linkedin.com/in/leksanderosnik/)
- [Shain Sutton](https://www.linkedin.com/in/shain-sutton-06009017a/)

## Acknowledgments

The following is a list of 3rd-party libraries and tools used in the production of Sports Assist:

- [Bluebird](https://www.npmjs.com/package/mongodb-bluebird)
- [Body-Parser](https://www.npmjs.com/package/body-parser)
- [Bootstrap](https://getbootstrap.com/)
- [Connect-Flash](https://www.npmjs.com/package/connect-flash)
- [Cookie-Parser](https://www.npmjs.com/package/cookie-parser)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://expressjs.com/)
- [Express Handlebars](https://www.npmjs.com/package/express-handlebars)
- [FontAwesome](https://fontawesome.com/)
- [GitHub](https://github.com/)
- [Handlebars](https://handlebarsjs.com/)
- [Helmet](https://helmetjs.github.io/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Node](https://nodejs.org/)
- [NoCache](https://www.npmjs.com/package/nocache)
- [Passport](http://www.passportjs.org/)
- [Promisfy](https://www.npmjs.com/package/promisify)
