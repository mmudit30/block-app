const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {
  registerDoctor,
  getDoctorInfo,
  getPatientResult,
} = require('./services/transactionService');

app.use(cors());
app.use(bodyParser.json());

app.post('/register-doctor', async (req, res) => {
  try {
    // const { address, id, name, labId } = req.body;
    // console.log(req.body);
    // console.log(address);    
    await registerDoctor(
      req.body.doctor_ethereum_address,
      req.body.doctor_unique_id,
      req.body.doctor_full_name,
      req.body.doctor_lab_id,
      res
      );
      // address, id, name, labId, res);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.get('/get-patient-result', async (req, res) => {
  const { patientId } = req.query;
  const result = await getPatientResult(patientId);
  res.send(result);
});
app.get('/get-doctor', async (req, res) => {
  const { doctorId } = req.query;
  const result = await getDoctorInfo(doctorId);
  res.send(result);
});

app.listen(4000)
    .on('listening', ()=>{
      console.log("Listening on http://localhost:4000/ ");
    });
