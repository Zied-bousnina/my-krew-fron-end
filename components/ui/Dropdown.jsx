import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { set } from "date-fns";

const Dropdown = ({
  label = "Dropdown",
  wrapperClass = "inline-block",
  labelClass = "label-class-custom",
  children,
  classMenuItems = "mt-2 w-[320px]",
  items = [
    {
      label: "Action",
      link: "#",
    },
    {
      label: "Another action",
      link: "#",
    },
    {
      label: "Something else here",
      link: "#",
    },
  ],
  classItem = "px-4 py-2",
  className = "",
  toggleClose,
  isFixed = false,
}) => {
  // Example state and method to control visibility, for external use cases
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [toggleClose]);

  return (
    <div className={`relative ${wrapperClass}`}>
      <Menu as="div" className={`block w-full ${className}`}>
        {/* Modified to include an onClick handler for demonstration */}
        <Menu.Button className="block w-full" onClick={toggleDropdown}>
          <div className={labelClass}>{label}</div>
        </Menu.Button>

        {isFixed ? (
          <Transition
            as={Fragment}
            show={isOpen}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={`absolute ltr:right-0 rtl:left-0 origin-top-right border -bottom-2 border-slate-100
            rounded bg-white dark:bg-slate-800 dark:border-slate-700 shadow-dropdown z-[9999]
            ${classMenuItems}
            `}
            >
              <div className="flex justify-end">
                <div
                  className="p-1 hover:bg-slate-200 cursor-pointer rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon icon="heroicons:x-mark" width={15} />
                </div>
              </div>

              <div>
                {children
                  ? children
                  : items?.map((item, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <div
                            className={`${
                              active
                                ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                                : "text-slate-600 dark:text-slate-300"
                            } block ${
                              item.hasDivider
                                ? "border-t border-slate-100 dark:border-slate-700"
                                : ""
                            }`}
                          >
                            {item.link ? (
                              <Link
                                href={item.link}
                                className={`block ${classItem}`}
                              >
                                {item.icon ? (
                                  <div className="flex items-center">
                                    <span className="block text-xl ltr:mr-3 rtl:ml-3">
                                      <Icon icon={item.icon} />
                                    </span>
                                    <span className="block text-sm">
                                      {item.label}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="block text-sm">
                                    {item.label}
                                  </span>
                                )}
                              </Link>
                            ) : (
                              <div
                                className={`block cursor-pointer ${classItem}`}
                              >
                                {item.icon ? (
                                  <div className="flex items-center">
                                    <span className="block text-xl ltr:mr-3 rtl:ml-3">
                                      <Icon icon={item.icon} />
                                    </span>
                                    <span className="block text-sm">
                                      {item.label}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="block text-sm">
                                    {item.label}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
              </div>
            </Menu.Items>
          </Transition>
        ) : (
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={`absolute ltr:right-0 rtl:left-0 origin-top-right bottom-6 border border-slate-100
            rounded bg-white dark:bg-slate-800 dark:border-slate-700 shadow-dropdown z-[9999]
            ${classMenuItems}
            `}
            >
              <div>
                {children
                  ? children
                  : items?.map((item, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <div
                            className={`${
                              active
                                ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                                : "text-slate-600 dark:text-slate-300"
                            } block ${
                              item.hasDivider
                                ? "border-t border-slate-100 dark:border-slate-700"
                                : ""
                            }`}
                          >
                            {item.link ? (
                              <Link
                                href={item.link}
                                className={`block ${classItem}`}
                              >
                                {item.icon ? (
                                  <div className="flex items-center">
                                    <span className="block text-xl ltr:mr-3 rtl:ml-3">
                                      <Icon icon={item.icon} />
                                    </span>
                                    <span className="block text-sm">
                                      {item.label}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="block text-sm">
                                    {item.label}
                                  </span>
                                )}
                              </Link>
                            ) : (
                              <div
                                className={`block cursor-pointer ${classItem}`}
                              >
                                {item.icon ? (
                                  <div className="flex items-center">
                                    <span className="block text-xl ltr:mr-3 rtl:ml-3">
                                      <Icon icon={item.icon} />
                                    </span>
                                    <span className="block text-sm">
                                      {item.label}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="block text-sm">
                                    {item.label}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
              </div>
            </Menu.Items>
          </Transition>
        )}
      </Menu>
    </div>
  );
};

export default Dropdown;
