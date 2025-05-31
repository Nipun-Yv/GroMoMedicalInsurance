
type Category="dataset"|"component"|"template"|"custom"|"any"
const CategoryBar = ({selected}:{selected:Category}) => {
  return (
    <div
      className="flex rounded-md h-full items-center shadow-md p-1 font-light border-1
    text-gray-600"
    >
      {/* <OptionDecorator category="coverage" selected={selected}/>
      <OptionDecorator category="pricing" selected={selected}/>
      <OptionDecorator category="models" selected={selected}/>
      <OptionDecorator category="custom" selected={selected}/>
      <OptionDecorator category="any" selected={selected}/> */}
    </div>
  );
};

const OptionDecorator=({category,selected}:{category:Category,selected:Category})=>{
    return (
      <a href={`/products/?category=${category}`} className={`${selected==category && "text-purple-500 rounded-md" } h-full flex-1
      px-3 flex
      justify-center items-center`}>
        {toTitleCase(category)}
      </a>
    )
} 
const toTitleCase=(str:string)=>{
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
export default CategoryBar;
