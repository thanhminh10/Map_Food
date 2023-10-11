/* eslint-disable prettier/prettier */
import React from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';

const LineLayer = ({ coordinates }) => {
    return (
        <MapLibreGL.ShapeSource
            id="source1"
            lineMetrics={true}
            maxZoomLevel={18}
            shape={{
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: coordinates,
                },
            }}>
            <MapLibreGL.LineLayer id="layer1" style={styles.lineLayer} />
        </MapLibreGL.ShapeSource>
    );
};

const styles = {
    lineLayer: {
        lineColor: 'red',
        lineCap: 'round',
        lineJoin: 'round',
        lineWidth: 4,
    },
};

export default LineLayer;