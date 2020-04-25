pragma solidity >=0.5.0 <=0.7.0;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Result is Ownable {
    uint256 id = 0;
    mapping(address => bool) doctors;
    mapping(address => string) addressToDoctorId;
    mapping(string => DoctorInfo) idToDoctorInfo;
    mapping(string => uint256) patientToId;
    mapping(uint256 => Info) patientResult;
    struct Info {
        string name;
        string idType;
        string doctorId;
        string testResult;
    }
    struct DoctorInfo {
        string name;
        string hospital;
    }
    modifier onlyDoctor() {
        require(doctors[msg.sender], "You must be a doctor");
        _;
    }

    function assignDoctor(
        address _doctor,
        string calldata _doctorId,
        string calldata _name,
        string calldata _hospital
    ) external onlyOwner {
        doctors[_doctor] = true;
        addressToDoctorId[_doctor] = _doctorId;
        DoctorInfo doctor = idToDoctorInfo[_doctorId];
        doctor.name = _name;
        doctor.hospital = _hospital;
    }

    function addResult(
        string calldata _patientId,
        string calldata _name,
        string calldata _idType,
        string calldata _testResult
    ) external onlyDoctor {
        require(patientToId[_patientId] == 0, "patient is already exist");
        id++;
        patientToId[_patientId] = id;
        Info patient = patientResult[id];
        patient.name = _name;
        patient.idType = _idType;
        patient.doctorId = idToDoctorInfo[addressToDoctorId[msg.sender]];
        patient.testResult = _testResult;
    }

    function editResult(string calldata _patientId, string calldata _testResult)
        external
        onlyDoctor
    {
        require(patientToId[_patientId] != 0, "patient does not exist");
        uint256 patientId = patientToId[_patientId];
        Info patient = patientResult[patientId];
        patient.testResult = _testResult;
    }

    function getResult(string calldata _patientId)
        external
        view
        returns (string memory, string memory, string memory, string memory)
    {
        uint256 patientId = patientToId[_patientId];
        Info patient = patientResult[patientId];
        return (
            patient.name,
            patient.idType,
            patient.doctorId,
            patient.testResult
        );
    }
}
