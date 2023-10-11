/* eslint-disable prettier/prettier */
import React from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';

const PolygonLayer = ({ coordinates }) => {

    return (<MapLibreGL.ShapeSource
        id="source1"
        maxZoomLevel={18}
        lineMetrics={true}
        shape={{
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: coordinates,
            },
        }}>
        <MapLibreGL.FillLayer
            id="fill-layer-id"
            style={styles.fillLayerStyle}
        />
    </MapLibreGL.ShapeSource>

    );
};

const styles = {
    fillLayerStyle: {
        fillAntialias: true,
        fillColor: 'green',
        fillOpacity: 0.84,
    },
    lineLayer: {
        lineColor: 'red',
        lineCap: 'round',
        lineJoin: 'round',
        lineWidth: 4,
        lineGradient: [
            'interpolate',
            ['linear'],
            ['line-progress'],
            0,
            'blue',
            0.1,
            'royalblue',
            0.3,
            'cyan',
            0.5,
            'lime',
            0.7,
            'yellow',
            1,
            'red',
        ],
    },
};

export default PolygonLayer;