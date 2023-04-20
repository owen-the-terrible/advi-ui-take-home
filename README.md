# Advi Bitcoin News App

Thank you for the opportunity to be able to put some skills of my skills on display, and giving me a chance at becoming a part of the AdviNOW team. This is a Frontend application designed to be ran locally for the time being per the free tier criteria of the gven API source. If membership was purchased, this would work beautifully on my deployed site at, 
https://advi-ui-take-home-git-development-owen-the-terrible.vercel.app/ 
For times sake, Id like to get this to you and ask you to proceed to run it locally.

## Process
If you have a process for cloning a repository, go ahead and do what is most familiar to you, if Not here are step by step instructions

    1.Open your web browser and go to the GitHub repository: https://github.com/owen-the-terrible/advi-ui-take-home 
     2.Click the "Code" button and copy the repository URL from the dropdown menu, next open a terminal on your computer.
     3.Navigate to the directory where you want to clone the repository using the "cd" command followed by the directory name. For example, if you want to clone the repository in the "Projects" directory, you would type "cd Projects".
     4.Once you are in the desired directory, type "git clone" followed by the repository URL you copied earlier. (https://github.com/owen-the-terrible/advi-ui-take-home.git)
     5.Hit enter and wait for the repository to finish cloning. This may take a few minutes depending on the size of the repository and your internet speed.
     6.Once the cloning process is complete, navigate into the cloned repository using the "cd" command followed by the repository name.
     7.In the root of the cloned repository, run "npm install" to install all the dependencies required to run the TypeScript React app.
     8.After the dependencies are installed, you can start the app by running "npm run dev". Once all packages are installed, navigate to http://localhost:3000/ in your browser and you will have full access.

## Navigation on home Page
This Navigationg bar has access to the four top news feeds for the everything route for the newsapi route to the everything bitcoin which is free to test, information section. Clicking on the Advi logo is a default home button.

### Navigation in any other route
Includes top four new feeds and a link to the home route.

## Home Page
    1.This page includes all of the top articles. The main pictures labeled as "Top News" are the news feeds source that supply the most information or are the most popular. The secondary section contains an element which has either     
            A) A source to Either all of the newsItems main articles, being the ones in the top row that are more bold in the footer, or... 
            B) A source to any other article within that secondary source. 
            C) The footer contains all of the most popularinformation,  pertaining from top four to every one lower in "ranking" afterward, all of which are a filter selection to find everthing pertainging to that sourcename (or filter for that sourceName).
## All Articles
In this section you will have access to a feed of either all of the articles, or will have multiple ways to filter by a certain source. As described before, the nav bar contains the most popular articles, and the footer contains these as well, followed by all or most of the sources thereafter. When in this area, you can choose between Searching by Title, Description, Author, Source or Date. Regardless of what way you have chose to find articles, these will be seperated into different pages by a max of 8 per page. you can switch pages by clicking on the page number located just below the section header (everything, business insider, google news... etc..). By clicking on any of the pictures foud here you may access a Single Article view.

## Single Article
Purely an informational section, you will be able to have a larger view of the article that ws selected. You still have the option to choose a source to go back to through the Nav or the footer, or you may head back to view everything at once by clicking the "Back to Articles" directional link at the bottom.

## Not Found Modal
This Modal will only pop up if whatever you're searching for is not found. Once this Modal pops up you may either click the Home button to go to the home section, or you may click go back which will send you to the "All Articles" section. Also need be you can click the x in the top right corner to just close the modal.  