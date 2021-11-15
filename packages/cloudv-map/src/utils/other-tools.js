const tools = {
    /**
     * guid 生成算法
     * eg: 'ecbb4852-2fde-b4c6-5424-a01c9f594725'
     */
    getGuid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (
            S4() +
            S4() +
            "-" +
            S4() +
            "-" +
            S4() +
            "-" +
            S4() +
            "-" +
            S4() +
            S4() +
            S4()
        );
    }
}

export default tools;