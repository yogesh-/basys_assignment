import React, { useState } from "react";
import { useForm } from "react-hook-form";

const PayerForm = () => {
  const [sameAddress, setSameAddress] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/addPayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset();
      }
      if (!response.ok) {
        throw new Error("Operation failed, Please try again");
      }
    } catch (error) {
      console.error("Error creating provider:", error);
    }
  };

  //   input validation

  const isAlphabetic = (value) => /^[A-Za-z]+$/.test(value);
  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhoneNumber = (value) => /^\+?[0-9]{10,}$/.test(value);
  const isAlphaNumeric = (value) => /^[a-zA-Z0-9]+$/.test(value);

  const handleCheckboxChange = () => {
    setSameAddress(!sameAddress);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add all payer details</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
          <input
            {...register("firstName", {
              required: true,
              validate: isAlphabetic,
            })}
            className="w-full mb-2"
            placeholder="First Name"
          />
          {errors.firstName && errors.firstName.type === "required" && (
            <span className="text-red-500">First Name is required</span>
          )}
          {errors.firstName && errors.firstName.type === "validate" && (
            <span className="text-red-500">
              First Name should only include alphabets
            </span>
          )}

          <input
            {...register("lastName", {
              required: true,
              validate: isAlphabetic,
            })}
            className="w-full mb-2"
            placeholder="Last Name"
          />
          {errors.lastName && errors.lastName.type === "required" && (
            <span className="text-red-500">Last Name is required</span>
          )}
          {errors.lastName && errors.lastName.type === "validate" && (
            <span className="text-red-500">
              Last Name should only include alphabets
            </span>
          )}

          <input
            {...register("nickName", {
              required: true,
              validate: isAlphabetic,
            })}
            className="w-full mb-2"
            placeholder="Nick Name"
          />
          {errors.nickName && errors.nickName.type === "required" && (
            <span className="text-red-500">First Name is required</span>
          )}
          {errors.nickName && errors.nickName.type === "validate" && (
            <span className="text-red-500">
              Nick Name should only include alphabets
            </span>
          )}

          <input
            {...register("phone", { required: true, validate: isPhoneNumber })}
            className="w-full mb-2"
            placeholder="Phone Number"
          />
          {errors.phone && errors.phone.type === "required" && (
            <span className="text-red-500">phone is required</span>
          )}
          {errors.phone && errors.phone.type === "validate" && (
            <span className="text-red-500">
              Invalid phone format, should only contain numbers
            </span>
          )}

          <input
            {...register("email", { required: true, validate: isEmail })}
            className="w-full mb-2"
            placeholder="Email Id"
          />
          {errors.email && errors.email.type === "required" && (
            <span className="text-red-500">Email is required</span>
          )}
          {errors.email && errors.email.type === "validate" && (
            <span className="text-red-500">Invalid email format</span>
          )}

          <select
            {...register("gender", { required: true })}
            className="w-full mb-2"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <span className="text-red-500">Gender is required</span>
          )}

          <select
            {...register("access", { required: true })}
            className="w-full mb-2"
          >
            <option value="">Select Access Rights</option>
            <option value="admin">Admin</option>
            <option value="regular_user">Regular User</option>
            <option value="read_only">Read Only</option>
          </select>
          {errors.access && (
            <span className="text-red-500">Access rights is required</span>
          )}
        </div>

        {/* Entity Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Entity Details</h3>

          <input
            {...register("entityName", {
              required: true,
              validate: isAlphabetic,
            })}
            className="w-full mb-2"
            placeholder="Name of Entity"
          />
          {errors.entityName && (
            <span className="text-red-500">Name of Entity is required</span>
          )}
          {errors.entityName && errors.entityName.type === "validate" && (
            <span className="text-red-500">
              Entity name should only be alphabetic
            </span>
          )}

          <input
            {...register("taxId", {
              required: true,
              validate: isAlphaNumeric,
            })}
            className="w-full mb-2"
            placeholder="Tax ID"
          />
          {errors.taxId && (
            <span className="text-red-500">Tax ID is required</span>
          )}

          {errors.taxId && errors.taxId.type === "validate" && (
            <span className="text-red-500">
              Tax ID can only contain numbers and letters
            </span>
          )}

          <select
            {...register("providerNetworks", { required: true })}
            className="w-full mb-2"
          >
            <option value="">Select Provider Network</option>
            <option value="providerA">Provider Network A</option>
            <option value="ProviderB">Provider Network B</option>
            <option value="ProviderC">Provider Network C</option>
          </select>
          {errors.gender && (
            <span className="text-red-500">Gender is required</span>
          )}
          <textarea
            {...register("physical_address", { required: true })}
            className="w-full mb-2 h-32 resize-none"
            placeholder="Enter complete Physical Address with street name, building, ZIP code and country"
          />
          {errors.address && (
            <span className="text-red-500">Address is required</span>
          )}

          <input
            type="checkbox"
            {...register("defaultCheckbox")}
            className="mr-2"
            defaultChecked
            onChange={handleCheckboxChange}
          />
          <label htmlFor="defaultCheckbox">
            Physical Address and Billing Address is Same
          </label>

          {sameAddress === false && (
            <textarea
              {...register("billing_address", { required: true })}
              className="w-full mb-2 h-32 resize-none"
              placeholder="Enter complete Billing Address with street name, building, ZIP code and country"
            />
          )}
        </div>

        {/* Documents Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Documents</h3>
          <div>
            <label htmlFor="proofOfInsurance">*Upload Proof Of Insurance</label>
            <input
              type="file"
              {...register("proofOfInsurance", { required: true })}
              className="mb-2 mt-2"
            />
            {errors.proofOfInsurance && (
              <span className="text-red-500">
                Proof of Insurance is required
              </span>
            )}
          </div>

          <div className="flex flex-col mt-6">
            <label htmlFor="businessCertification">
              *Upload Business Certification
            </label>
            <input
              type="file"
              {...register("businessCertification", { required: true })}
              className="mb-2 mt-2"
            />

            {errors.businessCertification && (
              <span className="text-red-500">
                Business Certification is required
              </span>
            )}
          </div>
        </div>

        {/* Login Credentials */}

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Login Credentials</h3>
          <input
            {...register("userName", {
              required: true,
              validate: isAlphaNumeric,
            })}
            className="w-full mb-2"
            placeholder="User Name"
          />
          {errors.userName && (
            <span className="text-red-500">Tax ID is required</span>
          )}

          <input
            {...register("passWord", {
              required: true,
              validate: isAlphaNumeric,
            })}
            className="w-full mb-2"
            placeholder="Password"
          />
          {errors.userName && (
            <span className="text-red-500">Password is required</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PayerForm;
