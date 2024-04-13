import { useState, Fragment } from "react";
import { useNavigate } from "react-router";
import {
  servers,
  queueTypes,
  divisions,
  boostTypes,
  tiers,
} from "./components/statics";
import Dropdown from "./components/Dropdown";



export default function BoostForm() {
  const navigate = useNavigate();

  const [region, setRegion] = useState("Select a Region");
  const [queueType, setQueueType] = useState("Select a Queue Type");
  const [boostType, setBoostType] = useState("Select a Boost Type");
  const [currentTier, setCurrentTier] = useState("Select your Current Tier");
  const [currentDivision, setCurrentDivision] = useState(
    "Select your Current Division"
  );
  const [desiredTier, setDesiredTier] = useState("Select your Desired Tier");
  const [desiredDivision, setDesiredDivision] = useState(
    "Select your Desired Division"
  );
  const [additionalNotes, setAdditionalNotes] = useState("Preferred champions, roles, etc.");
  const [currentLP, setCurrentLP] = useState("");

  const regionChange = (e) => {
    setRegion(e);
  };
  const queueTypeChange = (e) => {
    setQueueType(e);
  };
  const boostTypeChange = (e) => {
    setBoostType(e);
  };
  const currentTierChange = (e) => {
    setCurrentTier(e);
  };
  const currentDivisionChange = (e) => {
    setCurrentDivision(e);
  };
  const desiredTierChange = (e) => {
    setDesiredTier(e);
  };
  const desiredDivisionChange = (e) => {
    setDesiredDivision(e);
  };
  const additionalNotesChange = (e) => {
    setAdditionalNotes(e.target.value);
  };
  const currentLPChange = (e) => {
    setCurrentLP(e.target.value);
  };

  const [alert, setAlert] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      region: region,
      queueType: queueType,
      boostType: boostType,
      currentTier: currentTier,
      currentDivision: currentDivision,
      desiredTier: desiredTier,
      desiredDivision: desiredDivision,
      currentLP: currentLP,
    };
    if (additionalNotes !== "Preferred champions, roles, etc.") {
      data.additionalNotes = additionalNotes;
    }

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `${process.env.REACT_APP_API_HOST}/orders/`;
    const response = await fetch(url, fetchConfig);
    let responseMessage = await response.json();

    if (response.status === 400) {
      setAlert(responseMessage);
    } else if (response.ok) {
      setRegion("Select a Region");
      setQueueType("Select a Queue Type");
      setBoostType("Select a Boost Type");
      setCurrentTier("Select your Current Tier");
      setCurrentDivision("Select your Current Division");
      setDesiredTier("Select your Desired Tier");
      setDesiredDivision("Select your Desired Division");
      setAdditionalNotes("");
      navigate("/home");
    }
  };

  return (
    <div className="bg-gray-200 p-2 rounded-md flex justify-center items-center" style={{marginTop: '5%', marginLeft: 'auto', marginRight: 'auto', width: '40%'}}>
      <div className="grid grid-cols-2 grid-rows-4 gap-2">
        <div>
          <Dropdown options={servers} selected={region} setSelected={regionChange} title={'Region'} />
        </div>
        <div>
          <label htmlFor="currentLP" className="block text-sm font-medium leading-6 " style={{textAlign: 'center', marginTop: '8%'}}>
            Current LP
          </label>
          <input
            id="currentLP"
            className="relative mt-2 w-full text-center" // Add "text-center" class to center the input text
            type="number" // Change the input type to "number"
            value={currentLP}
            onChange={currentLPChange}
          />
        </div>
        <div>
          <Dropdown options={tiers} selected={currentTier} setSelected={currentTierChange} title={'Current Tier'} />
        </div>
        <div>
          <Dropdown options={divisions} selected={currentDivision} setSelected={currentDivisionChange} title={'Current Division'} />
        </div>
        <div>
          <Dropdown options={tiers} selected={desiredTier} setSelected={desiredTierChange} title={'Desired Tier'} />
        </div>
        <div>
          <Dropdown options={divisions} selected={desiredDivision} setSelected={desiredDivisionChange} title={'Desired Division'} />
        </div>
        <div>
          <Dropdown options={queueTypes} selected={queueType} setSelected={queueTypeChange} title={'Queue Type'} />
        </div>
        <div>
          <Dropdown options={boostTypes} selected={boostType} setSelected={boostTypeChange} title={'Boost Type'} />
        </div>
        <div className="col-span-2">
          <label htmlFor="additionalNotes" className="block text-sm font-medium leading-6 ">
            Additional Notes
          </label>
          <textarea
            id="additionalNotes"
            className="relative mt-2 w-full text-center"
            defaultValue="Preferred champions, roles, etc."
            value={additionalNotes}
            onChange={additionalNotesChange}
          ></textarea>
        </div>
        <div className="col-span-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            style={{ margin: "10px" }}
            onClick={handleSubmit}
          >Submit</button>
        </div>
      </div>
    </div>
  );
}
