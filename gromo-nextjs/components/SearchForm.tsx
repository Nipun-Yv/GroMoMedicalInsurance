import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchForm = ({searchValue}:{searchValue:string}) => {
  return (
    <form
      className="flex-1 flex gap-3 border-r-2 h-full items-center p-3 shadow-lg"
      method="GET"
    >
      <Input
        placeholder="Search for products by name"
        name="search"
        className="w-full"
        defaultValue={searchValue}
      />
      <Button
        variant="outline"
        type="submit"
        className="border-2 border-purple-200 text-gray-500"
      >
        Search <SearchIcon />
      </Button>
    </form>
  );
};

export default SearchForm;
