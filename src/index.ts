
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
import sadhsangatRoutes from "./routes/sadhsangatRoutes";
import unitsMasterRoutes from "./routes/unitsMasterRoutes";
import hofMappingRoutes from "./routes/hofMappingRoutes";
import familyMemberRoutes from "./routes/familyMembersRoutes";
import sewadalRoutes from "./routes/sewadalRoutes";
import filterRoutes from "./routes/filterRoutes";
import { swaggerSpec, swaggerUi } from './swagger'; // Import Swagger config
var cors = require('cors')
// import sadhsangatRoutes from "./routes/sadhsangatRoutes";
// const sadhsangatRoutes = require('./routes/sadhsangatRoutes');
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use the routes
app.use('/api', sadhsangatRoutes);
app.use('/api', unitsMasterRoutes);
app.use('/api', hofMappingRoutes);
app.use('/api', familyMemberRoutes);
app.use('/api', sewadalRoutes);
app.use('/api', filterRoutes);


app.listen(3200, () => {
    console.log('Server is running on port 3200');
});
