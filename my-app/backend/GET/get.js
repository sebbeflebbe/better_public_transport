require('dotenv').config();

// This is the import of API key from local .env-file
<script src="https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}"></script>
