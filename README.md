# BioDiversityHW
## Step 1 : <br>
For the first step the data needed to be extracted from the sqlite database.<br>
There are 3 tables in the belly_button_diversity database <br>
a. otu <br>
b. samples <br>
c. samples_metadata <br>
The first step is to create routes and write SQLs to query the database and return the results in a JSON format.<br> 
FLASK web server has been used to render the data to the browser.<br>
Initial coding was done in Jupyter notebook, and each route was tested to verify that the data was being rendered correctly.<br>
The following routes were created
a. @app.route("/") : Renders the home page <br>
b. @app.route("/names") : Generates sample names <br>
c. @app.route("/otu") : Generates OTU descriptions <br>
d. @app.route("/otu_descriptions") : Genarates OTU IDs and descriptions <br>
e. @app.route("/metadata/<sample>") : Generates sample Meta Data <br>
f. @app.route('/wfreq/<sample>') : Genarates Wash Frequency <br>
g. @app.route('/samples/<sample>')  : Generates OTU IDs and Sample Values <br>



