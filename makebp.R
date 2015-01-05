makebp <- function(n,lmiss=10){
### systolic: 80 to 150
### dia: 55 to 95
    r = function(n,min,max){
        max = max*runif(1,.8,1)
        min = min*runif(1,1,1.2)
        if(min>max){
            tmp=max
            max=min
            min=tmp
        }
        z = c(arima.sim(list(ar=c(0.99,-.001),ma=c(4,4)),n))
        rr = max(z)-min(z)
        z=min + (max-min) * (z-min(z))/rr
        round(z)
    }
    s =  r(n, 80, 180)
    d =  r(n, 40, 80)
    bps = paste(s,d,sep="/")
    nmiss = rpois(1,lmiss)
    bps[(n-nmiss+1):n]=NA
    as.character(bps)
}

    
makebpdf <- function(nt, np){
    d = data.frame(do.call(rbind,lapply(1:np, function(n){makebp(nt)})),
        stringsAsFactors=FALSE)
    names(d)=paste("Week",1:nt,sep="")
    d
}


