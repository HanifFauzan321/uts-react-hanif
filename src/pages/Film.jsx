import { useState } from "react";
import { Trash, SquarePen } from "lucide-react";
import { Plus } from "lucide-react";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { List } from "lucide-react";
import { AlignVerticalSpaceAroundIcon } from "lucide-react";
import { Info } from "lucide-react";

let initialProducts = [
  {
    id: 1,
    name: "Samsung Galaxy S21",
    price: 999,
    image:
      "https://tse4.mm.bing.net/th?id=OIP.samsung-galaxy-s21&pid=Api&P=0&h=180",
  },
  {
    id: 2,
    name: "iPhone 12",
    price: 1099,
    image: "https://tse4.mm.bing.net/th?id=OIP.iphone-12&pid=Api&P=0&h=180",
  },
  {
    id: 3,
    name: "Vivo V20",
    price: 699,
    image:
      "https://tse4.mm.bing.net/th?id=OIP.google-pixel-5&pid=Api&P=0&h=180",
  },
  {
    id: 4,
    name: "iPhone 11 Series",
    price: 729,
    image: "https://cdn.jagofon.com/otf/pt_wlpWkxe93FFGKPdc6gXE6pXSO95AU9mr8MRCLg-U/t:10/w:320/f:avif/q:60/aHR0cHM6Ly9jZG4uamFnb2Zvbi5jb20vbW9ja2RhdGEvcHJvZHVjdC1tb2RlbHMvaXBob25lLTExLnBuZw",
  },
  {
    id: 5,
    name: "Poco X3 Pro",
    price: 749,
    image: "https://cdn.jagofon.com/otf/hPCp4yxQMhmVihHx0B7U6Tje0yBMAbHmyj7Hvfv3kQo/t:10/w:320/f:avif/q:60/aHR0cHM6Ly9jZG4uamFnb2Zvbi5jb20vbW9kZWwvVkV4OUpkRnA3bjZJYzh0d1hmMWh0WDlOVTdUdW5pc2dKTjNTUDhheS5qcGc",
  },
];

// const savedSorted = localStorage.getItem("film");

export default function Film() {
  const [film, setFilm] = useState([]);
  const [updateFilm, setUpdateFilm] = useState(null);
  const [addFilm, setAddFilm] = useState(null);
  const [orderBy, setOrderBy] = useState("asc");
  const [sortBy, setSortBy] = useState("id");
  const [search, setSearch] = useState("");

  const showInfo = (data) => {
    alert(
      ` Name          : ${data.name} \n price            : ${data.price} minute`
    );
  };

  const filterData = film
    .sort((a, b) => {
      if (orderBy === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter((item) => {
      //INCLUDES memeriksa apakah suatu array atau string berisi nilai atau substring tertentu
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

  function handleDelete(data) {
    if (window.confirm("Apakah kamu yakin hapus ini?")) {
      setFilm(film.filter((p) => p.id !== data.id));
    }
  }

  function handleUpdate() {
    setFilm(film.map((a) => (a.id === updateFilm.id ? updateFilm : a)));
    setUpdateFilm(null);
    console.log(setUpdateFilm);
  }

  function handleNewFilm() {
    const newId = film.length > 0 ? Math.max(...film.map((p) => p.id)) + 1 : 1;
    setFilm([...film, { ...addFilm, id: newId }]);
    setAddFilm(null);
  }

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("film")) || initialProducts;
    setFilm(storage);
    if (storage.length === 0) {
      localStorage.setItem("film", JSON.stringify(initialProducts));
    }
  }, []);

  return (
    <div className="w-full h-full full bg-contain">
      <div className="flex w-full items-center p-3">
        <div className="p-3 flex w-1/4 gap-2 justify-center">
          <button
            className="flex rounded-md bg-green-300 px-3"
            onClick={() => setAddFilm(film)}
          >
            <Plus />
            Add
          </button>
        </div>
        <div className="p-3 flex w-2/4 gap-2 justify-center bg-slate-200">
          <Search />
          <input
            type="text"
            className="bg-transparent"
            placeholder={"Search"}
            value={search}
            onChange={(x) => setSearch(x.target.value)}
          />
        </div>
        <label htmlFor="">
          <List className="m-auto" />
          <select
            className="cursor-pointer"
            value={sortBy}
            onChange={(x) => setSortBy(x.target.value)}
          >
            <option value="id">Normal</option>
            <option value="name">Name</option>
            <option value="price">price</option>
          </select>
        </label>
        <label htmlFor="">
          <AlignVerticalSpaceAroundIcon className="m-auto" />
          <select
            className="cursor-pointer"
            value={orderBy}
            onChange={(x) => setOrderBy(x.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-6 bg-fuchsia-400 bg-opacity-60 p-5 mx-20 rounded-xl">
        {filterData.map((data) => (
          <div className=" bg-white w-1/4 p-5 rounded-lg " key={data.id}>
            <div className="flex flex-col flex-wrap">
              <p className="m-3 font-black text-black text-center uppercase">
                {data.name}
              </p>
              <img className=" h-40" src={data.image} alt="" />
              <p className="m-3 text-center bg-blue-300">
                {"Rp. " + data.price}
              </p>
            </div>
            <div className="flex justify-center gap-2">
              <button onClick={() => handleDelete(data)}>
                <Trash className="text-black" />
              </button>
              <button onClick={() => showInfo(data)}>
                <Info className="text-black" />
              </button>
              <button className="" onClick={() => setUpdateFilm(data)}>
                <SquarePen className="text-black" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {updateFilm && (
        <div className="fixed z-10 inset-0 items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-3 w-1/2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <label>Name Film : </label>
              <input
                className="border border-gray-300 p-2 mb-4 w-full"
                type="text"
                id="name"
                value={updateFilm.name}
                onChange={(e) =>
                  setUpdateFilm({ ...updateFilm, name: e.target.value })
                }
              />
              <label>price : </label>
              <input
                className="border border-gray-300 p-2 mb-4 w-full"
                type="number"
                id="price"
                value={updateFilm.price}
                onChange={(e) =>
                  setUpdateFilm({
                    ...updateFilm,
                    price: parseInt(e.target.value),
                  })
                }
              />
              <label>Image : </label>
              <input
                className="border border-gray-300 p-2 mb-4 w-full"
                type="text"
                id="image"
                value={updateFilm.image}
                onChange={(e) =>
                  setUpdateFilm({
                    ...updateFilm,
                    image: e.target.value,
                  })
                }
              />
              <button type="submit" className="rounded-md bg-green-400 p-2 m-3">
                Save
              </button>
              <button
                type="button"
                className="rounded-md bg-red-400 p-2 m-3"
                onClick={() => setUpdateFilm(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {addFilm != null && (
        <div className="fixed z-10 inset-0 items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-3 w-1/2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNewFilm();
              }}
            >
              <label>Name Film : </label>
              <input
                className="border border-gray-300 p-2 mb-4 w-full"
                type="text"
                id="name"
                value={addFilm.name}
                onChange={(e) =>
                  setAddFilm({ ...addFilm, name: e.target.value })
                }
              />
              <label>price : </label>
              <input
                className="border border-gray-300 p-2 mb-4 w-full"
                type="number"
                id="price"
                value={addFilm.price}
                onChange={(e) =>
                  setAddFilm({
                    ...addFilm,
                    price: parseInt(e.target.value),
                  })
                }
              />
              <label>Image : </label>
              <input
                className="border border-gray-300 p-2 mb-4 w-full"
                type="text"
                id="image"
                value={addFilm.image}
                onChange={(e) =>
                  setAddFilm({
                    ...addFilm,
                    image: e.target.value,
                  })
                }
              />
              <button type="submit" className="rounded-md bg-green-400 p-2 m-3">
                Save
              </button>
              <button
                type="button"
                className="rounded-md bg-red-400 p-2 m-3"
                onClick={() => setAddFilm(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
