

const Sponsored = () => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-4 h-3/4 m-4 ml-12 ">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-gray-400 text-sm">Sponsored</h3>
          <button className="text-blue-500 text-sm">Create Ad</button>
        </div>
        <img
          src="assets/info1.jpeg"
          alt="BigGBurger"
          className="rounded-md mb-4 w-auto  "
        />
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-white font-semibold">BigGBurger</h4>
          <a href="#" className="text-gray-400 text-sm">
            BigGBurgers.com
          </a>
        </div>
        <p className="text-gray-400 text-sm">
          Your pathway to delicious stunning flavor with all natural ingredients.
        </p>
      </div>
    );
  };
  export default Sponsored;
  