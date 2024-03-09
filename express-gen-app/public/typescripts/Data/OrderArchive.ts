namespace Rootine
{
    /**
     * 注文内容に関するデータを格納するクラス
     */
    class OrderArchive
    {
        /** 
         * 商品名
         */
        public name:string;

        /**
         * 予約番号
         */
        public reservation:number;

        /**
         * 個数
         */
        public count:number;

        /**
         * 受け渡しの有無
         */
        public isReceived:boolean;

        /**
         * 値段
         */
        public value:number;

        /**
         * 注文総額
         */
        public sales:number;

        /**
         * 注文時刻
         */
        // 日時を管理するクラスで置き換える可能性あり
        public time:string;

        /**
         * 注文を受けた日程
         */
        public day:number;

        /**
         * 整理券リセット回数
         */
        public resetCount:number;

        public constructor(name:string, reservation:number, count:number, isReceived:boolean, value:number, time:string, day:number, resetCount:number)
        {
            this.name = name;
            this.reservation = reservation;
            this.count = count;
            this.isReceived = isReceived;
            this.value = value;
            this.time = time;
            this.day = day;
            this.sales = value * count;
            this.resetCount = resetCount;
        }
    }
}
