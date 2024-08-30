
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
import sadhsangatRoutes from "./routes/sadhsangatRoutes";
import unitsMasterRoutes from "./routes/unitsMasterRoutes";
import hofMappingRoutes from "./routes/hofMappingRoutes";
import familyMemberRoutes from "./routes/familyMembersRoutes";

import { swaggerSpec, swaggerUi } from './swagger'; // Import Swagger config

// import sadhsangatRoutes from "./routes/sadhsangatRoutes";
// const sadhsangatRoutes = require('./routes/sadhsangatRoutes');

app.use(bodyParser.json()); // Parse JSON bodies
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use the routes
app.use('/api', sadhsangatRoutes);
app.use('/api', unitsMasterRoutes);
app.use('/api', hofMappingRoutes);
app.use('/api', familyMemberRoutes);


app.listen(3200, () => {
    console.log('Server is running on port 3200');
});
