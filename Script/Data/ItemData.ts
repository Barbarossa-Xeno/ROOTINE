namespace Rootine
{
    /**
     * 商品のデータを格納するクラス
     */
    class ItemData
    {
        /**
         * 商品名
         */
        public name:string;

        /**
         * 値段
         */
        public value:number;

        /**
         * 商品ID
         */
        public id:number;

        public constructor (name:string,value:number,id:number)
        {
            this.name = name;
            this.value = value;
            this.id = id;
        }
    }
}