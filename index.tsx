import { useState } from "react";
import cn from "classnames";
import styles from "./Catalog.module.sass";
import List from "./List";
import SortingLink from "./SortingLink";
import Filters from "./Filters";
import Form from "../Form";
import Dropdown from "../Dropdown";
import Wishlist from "./Wishlist";

import { characters } from "../../mocks/characters";
import { planets } from "../../mocks/planets";
import { items } from "../../mocks/items";
import { bundles } from "../../mocks/bundles";
import { getSocialHandler } from "../../redux/action/nftAction/nftAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const sortDropdown: Array<string> = ["All", "On sale"];
const dispatchGetSocialHandler = (dispatch: any, payload: any) => {
    dispatch(getSocialHandler(payload))
}

type ListProps = {
    className?: string;
    value: any[];
    filters?: boolean;
    sort?: boolean;
    crop?: boolean;
    wishlist?: boolean;
    saleItem?: boolean;
    wishlistData?: any;
    ownNft?: any;
    stateActive?: any;
    marketActive?: any
};

const Catalog = ({
    className,
    value,
    filters,
    sort,
    crop,
    wishlist,
    saleItem,
    wishlistData,
    ownNft,
    stateActive,
    marketActive,
}: ListProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [dropdown, setDropdown] = useState<string>(sortDropdown[0]);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch()

    console.log("search", search)
    let allNft:any = []

    const handleSubmit = () => {
    
    };
    useEffect(() => {
        dispatchGetSocialHandler(dispatch, 0)
    }, [])
    console.log("ownNft", ownNft)
    const totalNft = useSelector((state: any) => state.getNftReducer.totalNft)
    if(totalNft){
        allNft = totalNft?.filter((val: any) => {
            if (search == "") {
                return val
            }
            else if (val.name.toLowerCase().includes(search.toLowerCase())) {
                return val
            }
        })
    }

    let lemonHouse = [];
    let lemonTree = [];
    if (allNft) {
        lemonHouse = allNft?.filter((val: any) => {
            if (val.type === "Lemon House") {
                return val
            }
        })

        lemonTree = allNft?.filter((val: any) => {
            if (val.type === "Lemon Tree") {
                return val
            }
        })
    }
    let myOwnNft=[]
    if(ownNft){
        myOwnNft = totalNft?.filter((val: any) => {
            if (search == "") {
                return val
            }
            else if (val.name.toLowerCase().includes(search.toLowerCase())) {
                return val
            }
        })
    }
let myWishList =[]
    if(wishlistData){
        myWishList = wishlistData?.filter((val: any) => {
            if (search == "") {
                return val
            }
            else if (val.name.toLowerCase().includes(search.toLowerCase())) {
                return val
            }
        })
    }

    return (
        <>
            <div className={cn(styles.catalog, className)}>
                <div className={cn(styles.head)}>
                    <div className={cn("container", styles.container)}>
                        <div className={styles.nav}>
                            {value?.map((x, index) => (
                                <SortingLink
                                    item={x}
                                    key={index}
                                    number={activeIndex}
                                    setNumber={setActiveIndex}
                                    index={index}
                                />
                            ))}
                        </div>
                        <div className={styles.actions}>
                            <Form
                                className={styles.form}
                                value={search}
                                setValue={setSearch}
                                onSubmit={() => handleSubmit()}
                                placeholder="Search lemon trees, houses, etc"
                                type="text"
                                name="search"
                                icon="search"
                            />
                            {filters && <Filters />}
                        </div>
                    </div>
                </div>

                <div className={styles.body}>
                    <div className={cn("container", styles.container)}>
                        {sort && (
                            <div className={styles.sort}>
                                <div className={cn("h3", styles.title)}>
                                    {value[activeIndex].title}
                                </div>

                                <Dropdown
                                    options={sortDropdown}
                                    value={dropdown}
                                    setValue={setDropdown}
                                    icon="filters"
                                />

                            </div>
                        )}

                        {wishlist ? (
                            <Wishlist value={activeIndex} wishlistData={myWishList} />
                        ) : marketActive === false ?
                            <h1>No Data Found</h1> : ownNft ? (
                                <List
                                    items={characters}
                                    nft={myOwnNft}
                                    crop={crop}
                                    saleItem={saleItem}
                                />
                            ) :
                                (
                                    {
                                        0: (
                                            <List
                                                items={characters}
                                                nft={lemonTree}
                                                crop={crop}
                                                saleItem={saleItem}
                                            />
                                        ),
                                        1: (
                                            <List
                                                items={characters}
                                                crop={crop}
                                                saleItem={saleItem}
                                                nft={lemonHouse}
                                            />
                                        ),

                                    }[activeIndex]
                                )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Catalog;
