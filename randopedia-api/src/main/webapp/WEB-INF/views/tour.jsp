<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <meta name="fragment" content="!">
    <!-- Set the viewport width to device width for mobile -->
    <meta name="viewport" content="width=device-width" />
    
    <title><c:out value="${tour.name}"/> - Ski touring in <c:out value="${area.name}"/> | Randopedia - The ski tour encyclopedia</title>
    
    <link rel="stylesheet" href="/css/foundation.min.css">
    <link rel="stylesheet" href="/css/general_foundicons.css">
    <link rel="stylesheet" href="/css/bjqs.css">
    <link rel="stylesheet" href="/css/normalize.css">
    <link rel="stylesheet" href="/css/randopedia.css">
    <link rel="stylesheet" href="/css/randopedia-icons.css">
    <script src="/js/libs/custom.modernizr.js"></script>
</head>


<body class="off-canvas hide-extras">

<%@ include file="/WEB-INF/views/header.jsp" %>

<div class="body-wrapper">


<div class="row">
<div class="small-12 columns main-content">

<div class="row">
    <div class="small-12 columns">
        <ul class="area-breadcrumb">
            <c:forEach items="${parents}" var="parent">
                <li><a href="../#!/areas/<c:out value="${parent.clientId}"/>"><c:out value="${parent.name}"/></a></li>
            </c:forEach>
        </ul>
    </div>
</div>


    <div class="row">
        <div class="small-10 columns">
            <h3>
                <c:out value="${tour.name}"/> <span class="secondary-text">(<c:out value="${tour.elevationMax}"/>m)</span> 
            </h3>
        </div>
    </div>
    
    <div class="row">
        <div class="large-12 columns">
            <p><c:out value="${tour.shortDescription}"/></p>
        </div>
    </div>
    
    <div class="row">
    <div class="small-12 large-6 columns">
            
        <c:if test="${not empty tour.timingMin && not empty tour.timingMax}">
            <div class="row">
                <div class="tourview-info-row">     
                    <div class="small-4 large-3 columns">
                        <span class="tourview-label">Time:</span>
                    </div>
                    <div class="small-8 large-9 columns">
                        <c:out value="${tour.timingMin}"/>-<c:out value="${tour.timingMax}"/>h
                    </div>
                </div>              
            </div>
        </c:if>
    
        <c:if test="${not empty tour.elevationGain && not empty tour.elevationLoss}">
            <div class="row">
                <div class="tourview-info-row">     
                    <div class="small-4 large-3 columns">
                        <span class="tourview-label">Elevation:</span>
                    </div>
                    <div class="small-8 large-9 columns">
                        
                            <c:out value="${tour.elevationGain}"/>m &uarr; 
                            <c:out value="${tour.elevationLoss}"/>m &darr;
                        
                    </div>
                </div>
            </div>
        </c:if>
            
        <c:if test="${not empty tour.grade}">
            <div class="row">
                <div class="tourview-info-row">     
                    <div class="small-4 large-3 columns">
                        <span class="tourview-label">Grade:</span>
                    </div>
                    <div class="small-8 large-9 columns">
                        
                             <c:out value="${grade}"/>
    
                    </div>       
                </div>         
            </div>
        </c:if> 
        
        <c:if test="${not empty tour.degreesMax}">
            <div class="row">
                <div class="tourview-info-row">     
                    <div class="small-4 large-3 columns">
                        <span class="tourview-label">Steepness:</span>
                    </div>
                    <div class="small-8 large-9 columns">
                        <c:out value="${tour.degreesMax}"/>&#176;
                    </div>
                </div>
            </div>
        </c:if>

        <c:if test="${not empty tour.timeOfYearFrom && not empty tour.timeOfYearTo}">
            <div class="row">
                <div class="tourview-info-row">     
                    <div class="small-4 large-3 columns">
                        <span class="tourview-label">Season:</span>
                    </div>
                    <div class="small-8 large-9 columns">
                        <c:out value="${from}"/> - <c:out value="${to}"/>
                    </div>    
                </div>            
            </div>
        </c:if>
        
        <c:if test="${not empty tour.aspect}">
            <div class="row">
                <div class="tourview-info-row">
                    <div class="small-4 large-3 columns">
                        <span class="tourview-label">Aspect:</span>
                    </div>
                    <div class="small-8 large-9 columns">
                        <c:out value="${aspect}"/>
                    </div>                
                </div>
            </div>
        </c:if>
        
        <c:if test="${not empty tour.tags}">
            <div class="row">
                <div class="tourview-info-row">
                    <div class="small-4 large-3 columns">
                        <span class="tourview-label">Tags:</span>
                    </div>
                    <div class="small-8 large-9 columns">
                        <c:forEach items="${tour.tags}" var="tag">
                            <a href="../#!/tags/<c:out value="${tag}"/>">#<c:out value="${tag}"/></a>
                        </c:forEach>
                        
                    </div>                
                </div>
            </div>
        </c:if>
        
        
    </div>
    </div>

    <div class="row">
        <div class="small-12 columns">
           <h4 class="subheader">Access point</h4>
           <pre class="formatted-desc"><c:out value="${tour.accessPoint}"/></pre>
        </div>
    </div>
    
    <div class="row">
        <div class="small-12 columns">
            <h4 class="subheader">Description</h4>
            <c:out value="${itinerary}" escapeXml="false"/>
        </div>
    </div>
    
    <div class="row">    
        <div class="small-12 columns">
            <h4 class="subheader">Images</h4>
            <div id="images-container">
                    <c:forEach items="${images}" var="image">
                        <img src="${image.imageData}"><br/>
                    </c:forEach>
            </div>

        </div>
    </div>

</div>
</div>
</div>



<%@ include file="/WEB-INF/views/footer.jsp" %>
</body>
</html>