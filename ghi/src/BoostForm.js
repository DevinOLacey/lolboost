import { useState, Fragment } from "react";
import { useNavigate } from "react-router";
import { servers } from "./components/statics";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
  const [additionalNotes, setAdditionalNotes] = useState("");

  const regionChange = (e) => {
    setRegion(e.target.value);
  };
  const queueTypeChange = (e) => {
    setQueueType(e.target.value);
  };
  const boostTypeChange = (e) => {
    setBoostType(e.target.value);
  };
  const currentTierChange = (e) => {
    setCurrentTier(e.target.value);
  };
  const currentDivisionChange = (e) => {
    setCurrentDivision(e.target.value);
  };
  const desiredTierChange = (e) => {
    setDesiredTier(e.target.value);
  };
  const desiredDivisionChange = (e) => {
    setDesiredDivision(e.target.value);
  };
  const additionalNotesChange = (e) => {
    setAdditionalNotes(e.target.value);
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
      additionalNotes: additionalNotes,
    };

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `${process.env.REACT_APP_API_HOST}/boosts/`;
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
    <div className="flex justify-center space-x-2 gap-2 flex-wrap flex-start">
      <div className="bg-gray-200 p-2 rounded-md">
        <Listbox value={region} onChange={regionChange}>
          {({ open }) => (
            <>
              <Listbox.Label
                className="block text-sm font-medium leading-6 "
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "5px",
                }}
              >
                Region
              </Listbox.Label>
              <div className="relative mt-2">
                <Listbox.Button className="relative w-full cursor-default rounded-md  py-1.5 pl-3 pr-10 text-left  ring-1 ring-inset ring-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                  <span className="flex items-center">
                    <span className="ml-3 block truncate">
                      {region || "Select a region"}
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {servers.map((region) => (
                      <Listbox.Option
                        key={region.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600 text-white"
                              : "bg-white text-black",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={region.name}
                      >
                        {({ region, active }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={classNames(
                                  region ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                text
                              </span>
                            </div>
                            {region ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              ></span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
}
