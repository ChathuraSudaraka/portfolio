const Contact = () => {
  return (
    <div className="lg:px-12 px-4">
      <div className="mb-20 text-center">
        <p className="text-xl text-headingcolor font-semibold mb-5">
          Let's keep in touch
        </p>
        <h2 className="md:text-5xl text-4xl text-headingcolor font-bold">
          Contact me
        </h2>
        <p className="mt-5">
          Contact us anytime for assistance or inquiries. We're here to help.
        </p>
      </div>
      <div className="mx-auto mb-20">
        <form className="bg-bgShade rounded-md shadow-lg px-8 pt-6 pb-8 mb-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="mb-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="first-name"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="first-name"
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="mb-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="last-name"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="last-name"
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Comment"
            >
              Comment
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Write your comment here..."
              rows={8}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
