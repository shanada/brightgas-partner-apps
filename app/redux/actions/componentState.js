export const onSetLoader = (isLoading, loaderMessage) => {
    return {
        type: 'SETLOADER',
        isLoading,
        loaderMessage
    };
};