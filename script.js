'use strict'

let searchButton = document.getElementById('search');
let locationInput = document.getElementById('locationInput');
let descriptionInput = document.getElementById("descriptionInput")

searchButton.addEventListener('click', () => {

  //containerOne contains all Jooble search results
  let containerOne = document.getElementById('container-one');
  containerOne.innerHTML = '';

  //containerTwo contains all GitHub search results
  let containerTwo = document.getElementById('container-two');
  containerTwo.innerHTML = '';

  //containerThree contains all USA JOBS search results
  let containerThree = document.getElementById('container-three');
  containerThree.innerHTML = '';

  searchResultBuilder();

});


function searchResultBuilder() {

  //Jooble API Call below

  const url = 'https://cors-anywhere.herokuapp.com/https://jooble.org/api/';
  const key = "c5d9b620-d7c0-4406-bb79-1396d2a42ca3";
  var params = {keywords: descriptionInput.value, location: locationInput.value};

  //create xmlHttpRequest object
  let req3 = new XMLHttpRequest();

  //open connection. true - asynchronous, false - synchronous
  req3.open("POST", url + key, true);

  //Send the proper header information
  req3.setRequestHeader("Content-type", "application/json");

  //Callback when the state changes
  req3.onreadystatechange = function() {
  	if(req3.readyState == 4 && req3.status == 200) {
      let dataThree = JSON.parse(req3.responseText);
      //console.log(dataThree);
      let containerOne = document.getElementById('container-one');
      for (let i = 0; i < 10; i++) {

        let divContainer = document.createElement('div');
        divContainer.setAttribute('class','divContainer');
        containerOne.appendChild(divContainer);

        //'div' contains results on left side of page, i.e. job title and job company.
        let div = document.createElement('div');
        div.setAttribute('class', 'myDiv');
        divContainer.appendChild(div);

        let jobTitle = document.createElement('a');
        jobTitle.innerHTML = dataThree.jobs[i].title;
        jobTitle.setAttribute('class', 'jobTitle');
        jobTitle.setAttribute('href', dataThree.jobs[i].link);
        jobTitle.setAttribute('target', '_blank');
        div.appendChild(jobTitle);

        let jobCompany = document.createElement('h4');
        jobCompany.setAttribute('class', 'jobCompany');
        jobCompany.innerHTML = dataThree.jobs[i].company;
        div.appendChild(jobCompany);

        //'divTwo' contains results on right side of page, i.e. job location and job post date.
        let divTwo = document.createElement('div');
        divTwo.setAttribute('class', 'myDivTwo');
        divContainer.appendChild(divTwo);

        let jobLocation = document.createElement('h4');
        jobLocation.setAttribute('class', 'jobLocation');
        jobLocation.innerHTML = dataThree.jobs[i].location;
        divTwo.appendChild(jobLocation);

        //momentjs.com cdn is used to standardize timestamp
        let joobleDate = dataThree.jobs[i].updated;
        let joobleStandardizedDate = new Date(joobleDate);
        let joobleMoment = moment(joobleStandardizedDate);
        let dayDifference = joobleMoment.fromNow();

        let jobPostDate = document.createElement('h4');
        jobPostDate.setAttribute('class', 'jobPostDate');
        jobPostDate.innerHTML = 'Posted ' + dayDifference;
        divTwo.appendChild(jobPostDate);
      }

    //if statement determines how many jobs will be shown in results for Jooble. If the number returned by the API is larger than the number below,a link appears, linking to the source website.
    if (dataThree.totalCount > 10) {
      let divThree = document.createElement('div');
      divThree.setAttribute('class', 'div-container-more-results');
      containerOne.appendChild(divThree);

      let moreResultsLink = document.createElement('a');
      moreResultsLink.setAttribute('href', 'https://jooble.org/jobs-' + descriptionInput.value + '/' + locationInput.value)
      moreResultsLink.setAttribute('target', '_blank');
      moreResultsLink.innerHTML = 'More Results From Jooble';
      divThree.appendChild(moreResultsLink);
    }
    }
  }
  //Send request to the server
  req3.send(JSON.stringify(params));

  //GitHub Jobs API Call below---------------------------------------------

  let req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      //console.log('Response recieved from server')
      if (req.status === 200) {
        //console.log('data loaded');
        let data = JSON.parse(req.response);
        //console.log(data);
        let containerTwo = document.getElementById('container-two');
        for (let i = 0; i < 10; i++) {

          let divContainer = document.createElement('div');
          divContainer.setAttribute('class','divContainer');
          containerTwo.appendChild(divContainer);

          //'div' contains results on left side of page, i.e. job title and job company.
          let div = document.createElement('div');
          div.setAttribute('class', 'myDiv');
          divContainer.appendChild(div);

          let jobTitle = document.createElement('a');
          jobTitle.innerHTML = data[i].title;
          jobTitle.setAttribute('class', 'jobTitle');
          jobTitle.setAttribute('href', data[i].url);
          jobTitle.setAttribute('target', '_blank');
          div.appendChild(jobTitle);

          let jobCompany = document.createElement('h4');
          jobCompany.setAttribute('class', 'jobCompany');
          jobCompany.innerHTML = data[i].company;
          div.appendChild(jobCompany);

          //'divTwo' contains results on right side of page, i.e. job location and job post date.
          let divTwo = document.createElement('div');
          divTwo.setAttribute('class', 'myDivTwo');
          divContainer.appendChild(divTwo);

          let jobLocation = document.createElement('h4');
          jobLocation.setAttribute('class', 'jobLocation');
          jobLocation.innerHTML = data[i].location;
          divTwo.appendChild(jobLocation);

          //momentjs.com cdn is used to standardize timestamp
          let githubDate = data[i].created_at;
          let githubStandardizedDate = new Date(githubDate);
          let githubMoment = moment(githubStandardizedDate);
          let dayDifference = githubMoment.fromNow();

          let jobPostDate = document.createElement('h4');
          jobPostDate.setAttribute('class', 'jobPostDate');
          jobPostDate.innerHTML = 'Posted ' + dayDifference;
          divTwo.appendChild(jobPostDate);
        }
      }
      else {
        console.log('Error' + req.status);
      }

      let data = JSON.parse(req.response);
      let containerTwo = document.getElementById('container-two');

      //if statement determines how many jobs will be shown in results for GitHub. If the number returned by the API is larger than the number below,a link appears, linking to the source website.
      if (data.length > 10) {
        let divThree = document.createElement('div');
        divThree.setAttribute('class', 'div-container-more-results');
        containerTwo.appendChild(divThree);

        let moreResultsLink = document.createElement('a');
        moreResultsLink.setAttribute('href', 'https://jobs.github.com/positions?utf8=%E2%9C%93&description=' + descriptionInput.value + '&location=' + locationInput.value);
        moreResultsLink.setAttribute('target', '_blank');
        moreResultsLink.innerHTML = 'More Results From GitHub';
        divThree.appendChild(moreResultsLink);
      }
    }
  }

  req.open('GET', 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=' + descriptionInput.value + '&location=' + locationInput.value);

  req.send();

  //USA JOBS API Call below-----------------------------------------------

  const host = 'data.usajobs.gov';
  const userAgent = 'phire1224@gmail.com';
  const authKey = '0n1JwGKrgecVjzrOiHslaTXRjXzJ4BfkAZaHO1vcAvA=';

  let req2 = new XMLHttpRequest();

  req2.open('GET', 'https://data.usajobs.gov/api/search?Keyword=' + descriptionInput.value + '&Location=' + locationInput.value);

  req2.setRequestHeader("Authorization-Key", authKey);

  req2.onreadystatechange = function() {
  	if(req2.readyState == 4 && req2.status == 200) {
      let dataTwo = JSON.parse(req2.responseText);
      //console.log(dataTwo);
      let containerThree = document.getElementById('container-three');
      for (let i = 0; i < 10; i++) {

        let divContainer = document.createElement('div');
        divContainer.setAttribute('class','divContainer');
        containerThree.appendChild(divContainer);

        //'div' contains results on left side of page, i.e. job title and job company.
        let div = document.createElement('div');
        div.setAttribute('class', 'myDiv');
        divContainer.appendChild(div);

        let jobTitle = document.createElement('a');
        jobTitle.innerHTML = dataTwo.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.PositionTitle;
        jobTitle.setAttribute('class', 'jobTitle');
        jobTitle.setAttribute('href', dataTwo.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.PositionURI);
        jobTitle.setAttribute('target', '_blank');
        div.appendChild(jobTitle);

        let jobCompany = document.createElement('h4');
        jobCompany.setAttribute('class', 'jobCompany');
        jobCompany.innerHTML = dataTwo.SearchResult.SearchResultItems[0].MatchedObjectDescriptor.OrganizationName + ' - '; //---> add full time with if statement here
        div.appendChild(jobCompany);

        //'divTwo' contains results on right side of page, i.e. job location and job post date.
        let divTwo = document.createElement('div');
        divTwo.setAttribute('class', 'myDivTwo');
        divContainer.appendChild(divTwo);

        let jobLocation = document.createElement('h4');
        jobLocation.setAttribute('class', 'jobLocation');
        jobLocation.innerHTML = dataTwo.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.PositionLocation[0].LocationName;
        divTwo.appendChild(jobLocation);

        //momentjs.com cdn is used to standardize timestamp
        let usajobsDate = dataTwo.SearchResult.SearchResultItems[0].MatchedObjectDescriptor.PublicationStartDate;
        let usajobsStandardizedDate = new Date(usajobsDate);
        let usajobsMoment = moment(usajobsStandardizedDate);
        let dayDifference = usajobsMoment.fromNow();

        let jobPostDate = document.createElement('h4');
        jobPostDate.setAttribute('class', 'jobPostDate');
        jobPostDate.innerHTML = 'Posted ' + dayDifference;
        divTwo.appendChild(jobPostDate);
      }

      //if statement determines how many jobs will be shown in results for USA JOBS. If the number returned by the API is larger than the number below,a link appears, linking to the source website.
      if (dataTwo.SearchResult.SearchResultCount > 10) {
        let divThree = document.createElement('div');
        divThree.setAttribute('class', 'div-container-more-results');
        containerThree.appendChild(divThree);

        let moreResultsLink = document.createElement('a');
        moreResultsLink.setAttribute('href', 'https://www.usajobs.gov/Search/Results?l=' + locationInput.value + '&k=' + descriptionInput.value);
        moreResultsLink.setAttribute('target', '_blank');
        moreResultsLink.innerHTML = 'More Results From USA JOBS';
        divThree.appendChild(moreResultsLink);
      }
    }
  }
  //send request to server
  req2.send();

}
