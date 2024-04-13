import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ options, selected, setSelected, title }) {

    return (
    <div className="bg-gray-200 p-2 rounded-md">
    <Listbox value={selected} onChange={setSelected}>
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
            {title}
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button
              className="relative w-full cursor-default rounded-md  py-1.5 pl-3 pr-10 text-left  ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              style={{ minWidth: "200px" }}
            >
              <span className="flex items-center">
                <span className="ml-3 block truncate">
                  {selected || "Select a Region"}
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
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-black",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={option.name}
                  >
                    {({ active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              option ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {option.name}
                          </span>
                        </div>
                        {active ? (
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
  </div>)
}
