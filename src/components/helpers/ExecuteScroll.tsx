export const executeScroll = (scrollRef: any) =>
scrollRef?.current?.scrollIntoView({
    behavior: 'smooth',
    inline: 'nearest',
});