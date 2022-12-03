import FilteringItem from "./FilteringItem";

const FilteringList = ({filteringData, category}) => {
    return (
        <ul>
            {filteringData.map(filteringCategoryName => (
                <FilteringItem
                    key={Math.random()}
                    id={filteringCategoryName}
                    category={category}
                    name={filteringCategoryName}
                />
            ))}
        </ul>
    );
}

export default FilteringList;