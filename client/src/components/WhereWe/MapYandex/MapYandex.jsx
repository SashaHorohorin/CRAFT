import React, {useContext, useEffect, useState} from "react";
import { YMaps, Map, Placemark, Clusterer } from "@pbe/react-yandex-maps";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

// const mapState = ;

const cities = [
    {
        id: 1,
        ongitude: 59.8891110909296,
        latitude: 30.47772311244199,
        placemarkText: "Динамит",
        address:
            "СК Динамит, переулок Челиева, 13В, Санкт-Петербург, м.Дыбенко, м.Большевиков",
        text: "Отличный зал: хороший свет, профессиональное покрытие, есть парковка на территории, раздевалки, душ, бесплатная сауна и кулер с водой.",
    },
    {
        id: 2,
        ongitude: 60.116808,
        latitude: 30.210826,
        placemarkText: "СК Импульс",
        address: "СК Импульс, Песочное шоссе, 99 б, м Озерки, пр. Просвещения.",
        text: "На автобусе 25-35 минут, на машине 10-20 минут от метро Озерки. Отличный зал: хороший свет, профессиональное покрытие, есть парковка на территории, раздевалки, душ.",
    },
    {
        id: 3,
        ongitude: 60.013032,
        latitude: 30.36135,
        placemarkText: "СК Алексеева",
        address: "СК Алексеева, просп. Раевского, 16.",
        text: "Отличный зал: хороший свет, профессиональное покрытие, раздевалки, душ.",
    },
];

const MapYandex = ({type}) => {
    const { eventStore } = useContext(Context);
    const [state, setState] = useState({
        center: [59.8891110909296, 30.47772311244199],
        zoom: 14,
        controls: [],
    });
    const [activeAdress, setActiveAdress] = useState(1);

    const getPointData = (index) => {
        return {
            iconContent: "CRAFT Club",
            balloonContentHeader: "Balloon3",
            balloonContent: "placemark <strong>balloon " + index + "</strong>",
        };
    };

    const getPointOptions = () => {
        return {
            balloonOffset: [3, -40],
            preset: "islands#redStretchyIcon",
        };
    };
    const onItemClick = (coords, id) => {
        setActiveAdress(id);
        setState({ center: coords});
    };
    useEffect(() => {
        // console.log(eventStore.indexMap);
        if(type == 'page'){
            // console.log(cities[eventStore.indexMap - 1]?.ongitude, cities[eventStore.indexMap - 1]?.latitude);
            setActiveAdress(eventStore.indexMap)
            setState({...state, center: [cities[eventStore.indexMap - 1]?.ongitude, cities[eventStore.indexMap - 1]?.latitude]});
        }
    }, [])
    return (
        <YMaps>
            <ul className="where__adresses adress">
                {cities.map((city) => (
                    <div
                        key={city.id}
                        onClick={() =>
                            onItemClick([city.ongitude, city.latitude], city.id)
                        }
                        className={
                            city.id === activeAdress
                                ? "adress__container active"
                                : "adress__container"
                        }
                    >
                        <div className="adress__name">{city.address}</div>
                        <div className="adress__text">{city.text}</div>
                    </div>
                ))}
            </ul>
            <Map className="adress__map" state={state}>
                {cities.map((items) => (
                    <Placemark
                        key={items.id}
                        geometry={[items.ongitude, items.latitude]}
                        modules={[
                            //чтобы видеть хинты и балуны подключаем данные модули
                            "objectManager.addon.objectsBalloon",
                            "objectManager.addon.objectsHint",
                        ]}
                        properties={getPointData(items.id)}
                        options={getPointOptions()}
                    />
                ))}
            </Map>
        </YMaps>
    );
};

export default observer(MapYandex);
