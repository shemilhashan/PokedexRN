import { FileSystem,Constants } from 'react-native-unimodules';
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import shorthash from 'shorthash';

function CachedImage(props) {
    const [source, setSource] = useState(null)

    useEffect(() => {
        const getCachedData = async () => {

            const { uri } = props
            const name = shorthash.unique(uri)
            const path = `${FileSystem.cacheDirectory}${name}`
            const image = await FileSystem.getInfoAsync(path)

            if (image.exists) {
                setSource({
                        uri: image.uri,
                    });
                return;
            }
            const newImage = await FileSystem.downloadAsync(uri, path);
            setSource({
                    uri: newImage.uri,
                });
        }
        getCachedData()

    }, [])

    return (
        <Image {...props} source={source}>
        </Image>
    );
}

export default CachedImage;