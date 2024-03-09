namespace Rootine
{
    /**
     * 注文総額・顧客総数のデータを格納するクラス
     */
    class SalesData
    {
        /**
         * 注文総額
         */
        public sales:number;

        /**
         * 顧客総数
         */
        public customerCount:number;

        public constructor (sales:number,customerCount)
        {
            this.sales = sales;
            this.customerCount = customerCount;
        }
    }
}