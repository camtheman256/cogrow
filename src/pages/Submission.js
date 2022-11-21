import { Layout } from "antd";
import { useParams } from "react-router-dom";
import logo from '../assets/images/cogrow-logo.png';

export default function SubmissionPage() {
  const { project } = useParams();
  return <Layout className="layout-dashboard">
    <Layout.Header>
      <div className="brand">
        <img src={logo} alt="" />
        <span>CoGrow</span>
      </div>
    </Layout.Header>
    <Layout.Content>
      <h1>Submit a Design for Project {project}</h1>


      <html lang="en">
<head>
<meta charset="utf-8">
<title>Get Current Position</title>
<script>
    function showPosition() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
                document.getElementById("result").innerHTML = positionInfo;
            });
        } else {
            alert("Sorry, your browser does not support HTML5 geolocation.");
        }
    }
</script>
</head>
<body>
    <div id="result">
        <!--Position information will be inserted here-->
    </div>
    <button type="button" onclick="showPosition();">Show Position</button>
</body>
</html>


      <form action="/my-handling-form-page" method="post">
  <ul>
    <li>
      <label for="name">Name:</label>
      <input type="text" id="name" name="user_name" />
    </li>
    <li>
      <label for="fileUpload">File Upload:</label>
      <textarea id="file" name="user_upload"></textarea>
    </li>
    <li>
      <label for="location_coordinates">Location:</label>
      <input type="coordinates" id="result" name="user_coordinates" />
    </li>

    <li class="button">
  <button type="submit">Submit Your Design</button>
</li>

  </ul>
</form>

    </Layout.Content>
  </Layout>
  }
  
