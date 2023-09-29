import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    ActivityIndicator,
    Image
} from 'react-native';

import { Articles, News } from '../types/news.d';
import { API_NEWS_TOKEN, API_NEWS_BASE_URL } from '../config.json';

const getNews = async () => {
    try {
        const response = await fetch(
            `${API_NEWS_BASE_URL}?country=us&apiKey=${API_NEWS_TOKEN}`
        );

        const json = await response.json();
        return json;
    } catch (error) {
        return { message: 'Something went wrong', cod: 500 };
    }
};

const NewsWidget = forwardRef((_props, ref) => {
    const [articles, setArticles] = useState<Articles[]>(null);
    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        refresh() {
            setIsLoading(true);
            getNews()
                .then((data) => {
                    const articles = data.articles.slice(0, 3);

                    articles.forEach((article) => {
                        if (article.title.length > 68) {
                            article.title = article.title.slice(0, 64) + '...';
                        }
                    });
                    setArticles(data.articles.slice(0, 3));
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }));

    useEffect(() => {
        setIsLoading(true);
        getNews()
            .then((data) => {
                const articles = data.articles.slice(0, 3);

                articles.forEach((article) => {
                    if (article.title.length > 68) {
                        article.title = article.title.slice(0, 64) + '...';
                    }
                });
                setArticles(data.articles.slice(0, 3));
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Latest news</Text>
            </View>
            <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : (
                    articles &&
                    articles.map((article, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.articleItem}
                            onPress={() => Linking.openURL(article.url)}
                            activeOpacity={0.8}
                        >
                            <Image
                                source={{ uri: article.urlToImage }}
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 16,
                                    marginRight: 8
                                }}
                            />
                            <Text style={styles.articleTitle}>
                                {article.title}
                            </Text>
                        </TouchableOpacity>
                    ))
                )}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        marginVertical: 10,
        width: '100%',
        borderWidth: 1,
        borderColor: '#EEF1F4',
        borderRadius: 16
    },
    titleContainer: {
        backgroundColor: 'white',
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEF1F4',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Unbounded-Medium'
    },
    articleItem: {
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    articleTitle: {
        fontSize: 16,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        fontWeight: '500',
        fontFamily: 'Unbounded-Medium',
        color: 'black',
        flex: 1,
        flexWrap: 'wrap'
    }
});

export default NewsWidget;
